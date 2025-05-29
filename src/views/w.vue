<script setup lang="ts">

</script>

<template>

</template>

<style scoped lang="scss">
// 在.whole-analysis中添加
.whole-analysis {
  display: flex;
  gap: 30px;

  .text-content {
    flex: 1;
    // 保持原有样式
  }

  .calendar-container {
    width: 300px;
    background: rgba(45, 40, 35, 0.7);
    border: 1px solid #5d4b32;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;

    .calendar-title {
      color: #fada9b;
      text-align: center;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(218, 185, 123, 0.3);
      padding-bottom: 8px;
    }

    .calendar {
      display: flex;
      flex-direction: column;

      .calendar-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin-bottom: 10px;

        .calendar-day-name {
          text-align: center;
          color: #d3b479;
          font-size: 14px;
        }
      }

      .calendar-body {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;

        .calendar-day {
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;

          &.current-month {
            background: rgba(40, 37, 32, 0.6);
          }

          &.has-achievements {
            box-shadow: 0 0 5px rgba(218, 185, 123, 0.5);

            .achievement-dot {
              position: absolute;
              bottom: 3px;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #fada9b;
            }
          }

          .day-number {
            font-size: 14px;
            color: #a89c7c;
            z-index: 1;
          }

          &:hover {
            transform: scale(1.1);
            z-index: 2;
            box-shadow: 0 0 10px rgba(218, 185, 123, 0.8);
          }
        }
      }
    }

    .calendar-tooltip {
      margin-top: 15px;
      padding: 8px;
      text-align: center;
      background: rgba(35, 32, 28, 0.8);
      border-radius: 8px;
      color: #d3b479;
      font-size: 14px;
      border: 1px solid #5d4b32;

      .highlight {
        color: #fcf7ec;
        font-weight: bold;
      }
    }
  }
}

// 响应式调整
@media (max-width: 1200px) {
  .whole-analysis {
    flex-direction: column;

    .calendar-container {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>