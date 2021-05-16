export default {
/* eslint-disable */
  data: () => ({
    tetrisModels: [
      { type: 'T', rotationStateCount: 4 },
      { type: 'L1', rotationStateCount: 4 },
      { type: 'L2', rotationStateCount: 4 },
      { type: 'LINE', rotationStateCount: 2 },
      { type: 'BOX', rotationStateCount: 1 },
      { type: 'Z1', rotationStateCount: 2 },
      { type: 'Z2', rotationStateCount: 2 },
    ],
  }),
  methods: {
    generateTetrisModel(type, locationSwNo, rotationState) {
      let result;
      const mainSw = this.items.find(item => item.swNo === locationSwNo);
      const moddedRotationState = rotationState % this.tetrisModels
        .find(tm => tm.type === type).rotationStateCount;
 
      // console.log(`generateTetrisModel: ${type} - ${locationSwNo} - ${moddedRotationState}`);
      switch (type) {
        case 'T':
          result = this.generateModelT(mainSw, moddedRotationState);
          break;
        case 'L1':
          result = this.generateModelL1(mainSw, moddedRotationState);
          break;
        case 'L2':
          result = this.generateModelL2(mainSw, moddedRotationState);
          break;
        case 'LINE':
          result = this.generateModelLine(mainSw, moddedRotationState);
          break;
        case 'BOX':
          result = this.generateModelBox(mainSw, moddedRotationState);
          break;
        case 'Z1':
          result = this.generateModelZ1(mainSw, moddedRotationState);
          break;
        case 'Z2':
          result = this.generateModelZ2(mainSw, moddedRotationState);
          break;
        default:
          return false;
      }

      this.paintSelectedKeys(result);
    },
    generateModelT(mainSw, rotationState) {
      let secondSw, thirdSw, fourthSw;

      switch(rotationState) {
        case 0:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          break;
        case 1:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          break;
        case 2:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          fourthSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          break;
        case 3:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          thirdSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          break;
        default:
          return false;
      }

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'brown darken-2' };
    },
    generateModelL1(mainSw, rotationState) {
      let secondSw, thirdSw, fourthSw;

      switch(rotationState) {
        case 0:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          fourthSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col - 1);
          break;
        case 1:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col - 1);
          break;
        case 2:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col + 1);
          break;
        case 3:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row  + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col + 1);
          break;
        default:
          return false;
      }

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'green darken-2' };
    },
    generateModelL2(mainSw, rotationState) {
      let secondSw, thirdSw, fourthSw;

      switch(rotationState) {
        case 0:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          fourthSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col + 1);
          break;
        case 1:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col - 1);
          break;
        case 2:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col - 1);
          break;
        case 3:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row  + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col + 1);
          break;
        default:
          return false;
      }

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'light-blue darken-2' };
    },
    generateModelLine(mainSw, rotationState) {
      let secondSw, thirdSw, fourthSw;

      switch(rotationState) {
        case 0:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row + 2 && item.col === mainSw.col);
          break;
        case 1:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          fourthSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 2);
          break;
        default:
          return false;
      }

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'indigo darken-2' };
    },
    generateModelBox(mainSw) {
      const secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
      const thirdSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
      const fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col + 1);

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'orange darken-2' };
    },
    generateModelZ1(mainSw, rotationState) {
      let secondSw, thirdSw, fourthSw;

      switch(rotationState) {
        case 0:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col - 1);
          thirdSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          break;
        case 1:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          thirdSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col + 1);
          fourthSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          break;
        default:
          return false;
      }

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'teal darken-2' };
    },
    generateModelZ2(mainSw, rotationState) {
      let secondSw, thirdSw, fourthSw;

      switch(rotationState) {
        case 0:
          secondSw = this.items.find(item => item.row === mainSw.row - 1 && item.col === mainSw.col);
          thirdSw = this.items.find(item => item.row === mainSw.row + 1 && item.col === mainSw.col);
          fourthSw = this.items.find(item => item.row === mainSw.row + 2 && item.col === mainSw.col);
          break;
        case 1:
          secondSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col + 1);
          thirdSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 1);
          fourthSw = this.items.find(item => item.row === mainSw.row && item.col === mainSw.col - 2);
          break;
        default:
          return false;
      }

      return { switches: [mainSw, secondSw, thirdSw, fourthSw], color: 'amber darken-2' };
    },
    paintSelectedKeys(result) {
      this.currentTetrisModel.switches = result.switches.map((sw) => {
        sw.status = true;
        sw.color = result.color;

        return sw;
      });
    },
    fetchRandomModel() {
      const randomModel = Math.floor(Math.random() * 7);
      const selectedTetrisModel = this.tetrisModels[randomModel];
      const randomRotationState = Math.floor(Math.random() * selectedTetrisModel.rotationStateCount + 1);
      const randomLocation = Math.floor(Math.random() * 7) + 23;

      this.currentTetrisModel = {
        type: selectedTetrisModel.type,
        mainSwLocation: randomLocation,
        rotationState: randomRotationState,
      };

      this.generateTetrisModel(selectedTetrisModel.type, randomLocation, randomRotationState);
    },
    runGenerateTetrisModelWithCurrentValues() {
      this.generateTetrisModel(
        this.currentTetrisModel.type,
        this.currentTetrisModel.mainSwLocation,
        this.currentTetrisModel.rotationState,
      );
    },
  },
};
