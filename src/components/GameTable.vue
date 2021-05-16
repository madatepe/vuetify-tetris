<script>
import { groupBy, orderBy } from 'lodash';
import generateTetrisModelMixin from '@/mixins/generateTetrisModel.js';

export default {
  name: 'GameTable',
  mixins: [generateTetrisModelMixin],
  props: {
    onPlay: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    items: [],
    isLoading: false,
    isInitialized: false,
    startInterval: null,
    currentTetrisModel: null,
    gameSpeed: 250,
  }),
  watch: {
    onPlay(newVal) {
      if (newVal) this.gameStart();
      else this.gameStop();
    },
  },
  created() {
    window.addEventListener('keyup', (e) => {
      if (this.onPlay) {
        if (e.which === 37) this.keyPressed('left', 'keyListener');
        if (e.which === 38) this.keyPressed('up', 'keyListener');
        if (e.which === 39) this.keyPressed('right', 'keyListener');
        if (e.which === 40) this.keyPressed('down', 'keyListener');
      } 
    });
  },
  mounted() {
    this.generateSwitches();
  },
  beforeDestroy () {
    clearInterval(this.startInterval);
  },
  methods: {
    generateSwitches() {
      this.isLoading = true;

      for(let i = 1; i <= 200; i++) {
        const tempItem = {
          swNo: i,
          col: (i % 10),
          row: (Math.floor(i / 10) + 1),
          status: false,
          isLocked: false,
          isFloorItem: false,
        };

        // This condition for rows last elements
        if ((i % 10) === 0) {
          tempItem.row = this.items[tempItem.swNo - 2].row;
          tempItem.col = this.items[tempItem.swNo - 2].col + 1;
        }

        if (i > 190) tempItem.isFloorItem = true;

        this.items.push(tempItem);
      }

      this.isLoading = false;
      this.isInitialized = true;
    },
    keyPressed(pressedBtn, from) {
      if (from === 'keyListener') {
        this.clearCurrentTetrisModel();
  
        if (pressedBtn === 'up') {
          this.currentTetrisModel.rotationState += 1;
        } else if (pressedBtn === 'left'
      && !this.currentTetrisModel.switches.map(sw => sw.swNo % 10).includes(1)) {
          this.currentTetrisModel.mainSwLocation -= 1;
        } else if (pressedBtn === 'right'
      && !this.currentTetrisModel.switches.map(sw => sw.swNo % 10).includes(0)) {
          this.currentTetrisModel.mainSwLocation += 1;
        } else if (pressedBtn === 'down') {
          // TODO MA: it should quick drop
        }
  
        this.runGenerateTetrisModelWithCurrentValues();
      }
    },
    gameStart() {      
      const vm = this;
      if (this.currentTetrisModel === null) this.fetchRandomModel();

      this.startInterval = setInterval(function(){
        if (vm.currentTetrisModel && vm.currentTetrisModel !== null) vm.moveTetrisModel();
      }, 250);
    },
    gameStop() {
      clearInterval(this.startInterval);
    },
    failError() {
      this.$emit('failError');
    },
    clearCurrentTetrisModel() {
      this.items.map((item) => {
        if (!item.isLocked) item.status = false;
      });
    },
    moveTetrisModel() {
      const lowerBounds = [];
      const swGroupByCol = groupBy(this.currentTetrisModel.switches, 'col');

      // It checks one after the last element of each column
      Object.keys(swGroupByCol).map((col) => {
        lowerBounds.push(orderBy(swGroupByCol[col], 'row', 'desc')[0]);
      });

      const nextSwitches = lowerBounds.map((lb) => {
        return this.items.find(item => item.row === lb.row + 1 && item.col === lb.col);
      });

      // If nextSwitches contains block, we should lock current model
      if (nextSwitches.some(lbs => lbs.status === true)) {
        this.lockCurrentModel();
      } else {
        this.clearCurrentTetrisModel();
        this.currentTetrisModel.mainSwLocation += 10;
        this.runGenerateTetrisModelWithCurrentValues();
        if (nextSwitches.some(lbs => lbs.isFloorItem === true)) {
          this.lockCurrentModel();
        }
      }
    },
    checkRowsForComplete() {
      const grouppedItemsByRow = groupBy(this.items, 'row');

      Object.keys(grouppedItemsByRow).map(async(r) => {
        if (grouppedItemsByRow[r].every(s => s.status === true && s.isLocked === true)) {
          await this.items.filter(i => i.row == r).map((i) => {
            i.status = false;
            delete i.color;
          });

          this.$emit('increaseScore');

          /* When a row is completed, it will be deleted and the blocks above it will slide down
             To move all cells, each should be started in reverse. */
          for (let i = 199; i >= 0; i--) {
            if (this.items[i].row !== 20
            && this.items[i].row < r
            && this.items[i].status === true) {
              this.items[i].status = false;
              this.items[i].isLocked = false;
              delete this.items[i].color;

              this.items[i + 10].status = true;
              this.items[i + 10].isLocked = true;
              this.items[i + 10].color = 'pink';
            }
          }
        }
      });

      // The game is over when the blocks reach the second line
      if (grouppedItemsByRow[3].some(r => r.isLocked === true )) this.failError();
    },
    async lockCurrentModel() {
      this.currentTetrisModel.switches.map((csw) => {
        csw.color = 'pink';
        csw.isLocked = true;
      });

      await this.checkRowsForComplete();
      this.fetchRandomModel();
    },
  },
};
</script>

<template>
  <v-container>
    <v-layout row class="game-table">
      <v-progress-linear
        v-if="isLoading || !isInitialized"
        indeterminate
        color="yellow darken-2"
      />

      <template v-else>
        <v-switch
          v-for="item in items" :key="item.swNo"
          v-model="item.status"
          :color="item.color ? item.color : 'primary'"
          @click="test(item)"
          hide-details
        />
      </template>
    </v-layout>
  </v-container>
</template>

<style scope lang="scss">
  .game-table {
    margin: auto !important;
    width: 500px;
  }
</style>
