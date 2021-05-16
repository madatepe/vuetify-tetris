<script>
import GameTable from './components/GameTable';
import FailErrorDialog from './components/FailErrorDialog';

export default {
  name: 'App',
  components: {
    GameTable,
    FailErrorDialog,
  },
  data: () => ({
    onPlay: false,
    score: 0,
    gameTableVisible: true,
    failErrorDialogVisible: false,
  }),
  created() {
    window.addEventListener('keyup', (e) => {
      if (e.which === 32 && this.failErrorDialogVisible === false) {
        this.onPlay = !this.onPlay;
      }
    });
  },
  methods: {
    increaseScore() {
      this.score += 10;
    },
    restartGame() {
      this.gameTableVisible = false,
      this.onPlay = false,
      this.score = 0;
      this.$nextTick(() => {
        this.gameTableVisible = true;
      });
    },
  },
};
</script>

<template>
  <v-app>
    <v-app-bar
      app dark color="primary"
    >
      <v-layout row wrap
                align-center
                justify-space-between>
        <v-flex shrink px-1>
          <v-btn
            @click="onPlay = true"
            color="success"
            x-large depressed dark
            :disabled="onPlay"
          >
            <v-icon x-large>mdi-play</v-icon>
            PLAY
          </v-btn>
        </v-flex>

        <v-flex shrink px-3>
          <v-btn
            @click="onPlay = false"
            color="orange"
            large depressed dark
            :disabled="!onPlay"
          >
            <v-icon x-large>mdi-pause</v-icon>
            PAUSE
          </v-btn>
        </v-flex>

        <v-flex shrink>
          <v-btn
            @click="restartGame"
            color="blue-grey darken-1"
            large depressed dark
          >
            <v-icon x-large>mdi-restart</v-icon>
            RESTART
          </v-btn>
        </v-flex>

        <v-spacer />

        <v-flex shrink>
          {{ new Date().getFullYear() }} — gitlab<strong>@madatepe</strong>
        </v-flex>

        <v-spacer />

        <v-flex shrink>
          <v-chip
            class="ma-2"
            color="white"
            large outlined
          >
          <v-icon large color="amber" left>
            mdi-fire
          </v-icon>
            <h2>SCORE: {{ score }}</h2>
          </v-chip>
        </v-flex>
      </v-layout>
    </v-app-bar>

    <v-main>
      <GameTable
        v-if="gameTableVisible"
        :on-play="onPlay"
        @increaseScore="increaseScore"
        @failError="failErrorDialogVisible = true; onPlay = false;"
      />
    </v-main>

    <FailErrorDialog
      v-if="failErrorDialogVisible"
      :score="score"
      @closed="failErrorDialogVisible = false; restartGame();"
    />
  </v-app>
</template>
