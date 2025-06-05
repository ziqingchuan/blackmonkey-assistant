<template>
  <div class="scripture-panel-overlay">
    <div class="scripture-panel">
      <div class="scripture-header">
        <h3>武学经书 · 棍法秘籍</h3>
        <button class="close-button" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#e7cc80" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="scripture-content">
        <div class="scripture-scroll">
          <div v-if="scriptureContent" class="methods-container">
            <!-- 显示基础棍法打法 -->
            <div
                v-if="scriptureContent.messageType === 'welcome'"
                class="stick-method-section"
                v-for="method in scriptureContent.methods" :key="method.title">
              <h4>{{ method.title }}</h4>
              <div class="method-content">
                <div class="method-text">
                  <p>{{ method.description }}</p>
                  <p>{{ method.techniques }}</p>
                </div>
                <div class="method-video">
                  <video controls>
                    <source :src="method.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </div>

            <!-- 显示流派说明 -->
            <div
                v-if="scriptureContent.messageType === 'school_recommendation'"
                class="school-detail-section"
                v-for="school in scriptureContent.schools" :key="school.name">
              <h4>{{ school.title }}</h4>
              <div class="school-content">
                <div class="school-text">
                  <p><strong>{{ school.name }}</strong></p>
                  <p>{{ school.description }}</p>
                  <div class="school-strategy">
                    <h5>修炼要诀：</h5>
                    <p>{{ school?.strategy }}</p>
                  </div>
                </div>
                <div class="school-video">
                  <video controls>
                    <source :src="school.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </div>

            <!-- 显示流派攻略 -->
            <div
                v-if="scriptureContent.messageType === 'training_progress'"
                class="strategy-section"
                v-for="strategy in scriptureContent.strategies"
                :key="strategy.name">
              <h4>{{ strategy.title }}</h4>
              <div class="strategy-content">
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.talentPoints"></div>
                </div>
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.equipment"></div>
                </div>
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.operation"></div>
                </div>
                <div class="strategy-item">
                  <div class="strategy-text" v-html="strategy.tips"></div>
                </div>
              </div>
            </div>

            <!-- 显示实战演示 -->
            <div v-if="scriptureContent.messageType === 'combat_training'" class="combat-demo-section"
                 v-for="demo in scriptureContent.combatDemos"
                 :key="demo.name">
              <h4>{{ demo.title }}</h4>
              <div class="demo-content">
                <div class="demo-description">
                  <p><strong>{{ demo.name }}</strong></p>
                  <p>{{ demo.description }}</p>
                </div>

                <!-- 视频演示 -->
                <div class="demo-video">
                  <h5>实战演示视频</h5>
                  <video controls>
                    <source :src="demo.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>

              <!-- 操作步骤 -->
              <div class="demo-steps">
                <h5>详细操作步骤</h5>
                <div class="steps-content" v-html="demo.operationSteps"></div>
              </div>
            </div>

            <!-- 显示上层流派秘籍 -->
            <div
                v-if="scriptureContent.messageType === 'advanced_schools'"
                class="advanced-school-section"
                v-for="method in scriptureContent.methods"
                :key="method.title">
              <h4>{{ method.title }}</h4>
              <div class="advanced-method-content">
                <!-- 修炼要诀和进阶心法并排显示 -->
                <div class="advanced-method-text-row">
                  <div class="description-section">
                    <h5>修炼要诀：</h5>
                    <div v-html="method.description.replace(/\n/g, '<br>')"></div>
                  </div>
                  <div class="techniques-section">
                    <h5>进阶心法：</h5>
                    <div v-html="method.techniques.replace(/\n/g, '<br>')"></div>
                  </div>
                </div>
                <!-- 视频单独一行 -->
                <div v-if="method.videoUrl" class="advanced-method-video-row">
                  <h5>实战演示视频</h5>
                  <video controls>
                    <source :src="method.videoUrl" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </div>

            <!-- 显示师父传承的最终秘籍 -->
            <div
                v-if="scriptureContent.messageType === 'advanced_school_details'"
                class="master-final-section"
                v-for="method in scriptureContent.methods"
                :key="method.title">
              <h4>{{ method.title }}</h4>
              <div class="master-final-description">
                <p>{{ method.description }}</p>
              </div>
              <div class="master-final-content" v-html="method.techniques"></div>
            </div>
          </div>
          <div v-else class="loading-content">
            <p>正在加载武学秘籍...</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { type ScriptureResponse} from "../../apis/playMethods.ts";
defineProps<{
  scriptureContent: ScriptureResponse['data']
}>();
const emit = defineEmits(['close-dialog'])
const closeModal = () => {
  emit('close-dialog'); // 触发关闭事件
};
</script>


<style scoped lang="scss">

/* 经书参悟面板样式 */
.scripture-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  .scripture-panel {
    width: 50vw;
    height: 100vh;
    background: linear-gradient(to left, #2a2118, #1a1510);
    border-left: 2px solid #d3b479;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    animation: slideInRight 0.3s ease-out;

    .scripture-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 30px;
      background: rgba(45, 35, 25, 0.9);
      border-bottom: 2px solid #5d4b32;

      h3 {
        color: #fada9b;
        margin: 0;
        font-size: 24px;
        font-family: 'STKaiti', cursive;
        text-shadow: 0 0 10px rgba(250, 218, 155, 0.3);
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 6px;
        transition: background 0.3s;

        &:hover {
          background: rgba(231, 204, 128, 0.1);
        }
      }
    }

    .scripture-content {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #d3b479 transparent;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #d3b479;
        border-radius: 4px;
      }

      .scripture-scroll {
        background: rgba(40, 35, 28, 0.6);
        padding: 30px;
        border-radius: 15px;
        border: 1px solid #5d4b32;
        color: #e7cc80;
        line-height: 1.8;
        font-size: 16px;

        h4 {
          color: #fada9b;
          font-size: 20px;
          margin-top: 30px;
          margin-bottom: 15px;
          text-align: center;
          border-bottom: 1px solid #5d4b32;
          padding-bottom: 10px;
          text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);

          &:first-child {
            margin-top: 0;
          }
        }

        p {
          margin-bottom: 15px;
          text-indent: 2em;
          color: #d3b479;
        }

        .stick-method-section {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }

          h4 {
            margin-top: 0;
            margin-bottom: 20px;
          }

          .method-content {
            display: flex;
            gap: 20px;
            align-items: flex-start;

            .method-text {
              flex: 1;

              p {
                text-indent: 0;
                margin-bottom: 12px;
                line-height: 1.6;
                color: #d3b479;
              }
            }

            .method-video {
              flex: 0 0 300px;

              video {
                width: 100%;
                height: auto;
                border-radius: 8px;
                border: 2px solid #5d4b32;
                background: #000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

                &:hover {
                  border-color: #d3b479;
                  box-shadow: 0 4px 16px rgba(211, 180, 121, 0.2);
                }
              }
            }

            @media (max-width: 768px) {
              flex-direction: column;

              .method-video {
                flex: none;
                width: 100%;
              }
            }
          }
        }

        .school-detail-section {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }

          h4 {
            margin-top: 0;
            margin-bottom: 20px;
          }

          .school-content {
            display: flex;
            gap: 20px;
            align-items: flex-start;

            .school-text {
              flex: 1;

              p {
                text-indent: 0;
                margin-bottom: 12px;
                line-height: 1.6;
                color: #d3b479;

                strong {
                  color: #fada9b;
                  font-size: 18px;
                  text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
                }
              }

              .school-strategy {
                margin-top: 15px;
                padding: 15px;
                background: rgba(45, 35, 25, 0.6);
                border-left: 3px solid #d3b479;
                border-radius: 6px;

                h5 {
                  color: #fada9b;
                  margin: 0 0 8px 0;
                  font-size: 16px;
                  font-weight: bold;
                }

                p {
                  margin: 0;
                  color: #e7cc80;
                  text-indent: 0;
                  line-height: 1.6;
                }
              }
            }

            .school-video {
              flex: 0 0 300px;

              video {
                width: 100%;
                height: auto;
                border-radius: 8px;
                border: 2px solid #5d4b32;
                background: #000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

                &:hover {
                  border-color: #d3b479;
                  box-shadow: 0 4px 16px rgba(211, 180, 121, 0.2);
                }
              }
            }

            @media (max-width: 768px) {
              flex-direction: column;

              .school-video {
                flex: none;
                width: 100%;
              }
            }
          }
        }

        .strategy-section {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }

          h4 {
            margin-top: 0;
            margin-bottom: 25px;
            font-size: 22px;
            text-align: center;
            color: #fada9b;
            text-shadow: 0 0 10px rgba(250, 218, 155, 0.4);
          }

          .strategy-content {
            display: flex;
            flex-direction: column;
            gap: 20px;

            .strategy-item {
              background: rgba(45, 35, 25, 0.6);
              border: 1px solid #5d4b32;
              border-radius: 10px;
              padding: 20px;
              transition: all 0.3s;

              &:hover {
                background: rgba(45, 35, 25, 0.8);
                border-color: #d3b479;
                box-shadow: 0 4px 12px rgba(211, 180, 121, 0.1);
              }

              .strategy-text {
                color: #e7cc80;
                line-height: 1.8;

                strong {
                  color: #fada9b;
                  font-size: 18px;
                  text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
                  display: block;
                  margin-bottom: 10px;
                  border-bottom: 1px solid #5d4b32;
                  padding-bottom: 8px;
                }

                br {
                  line-height: 2.2;
                }

                p {
                  margin: 8px 0;
                  text-indent: 0;
                }
              }
            }
          }
        }

        .combat-demo-section {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }

          h4 {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 22px;
            text-align: center;
            color: #fada9b;
            text-shadow: 0 0 10px rgba(250, 218, 155, 0.4);
          }

          .demo-content {
            display: flex;
            gap: 20px;
            align-items: flex-start;
            margin-bottom: 20px;

            .demo-description {
              flex: 1;

              p {
                text-indent: 0;
                margin-bottom: 12px;
                line-height: 1.6;
                color: #d3b479;

                strong {
                  color: #fada9b;
                  font-size: 18px;
                  text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
                }
              }
            }

            .demo-video {
              flex: 0 0 300px;

              h5 {
                margin-bottom: 10px;
                color: #fada9b;
                font-size: 16px;
                text-align: center;
              }

              video {
                width: 100%;
                height: auto;
                border-radius: 8px;
                border: 2px solid #5d4b32;
                background: #000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

                &:hover {
                  border-color: #d3b479;
                  box-shadow: 0 4px 16px rgba(211, 180, 121, 0.2);
                }
              }
            }

            @media (max-width: 768px) {
              flex-direction: column;

              .demo-video {
                flex: none;
                width: 100%;
              }
            }
          }

          .demo-steps {
            h5 {
              margin-bottom: 15px;
              color: #fada9b;
              font-size: 18px;
              text-shadow: 0 0 6px rgba(250, 218, 155, 0.3);
            }

            .steps-content {
              background: rgba(61, 45, 30, 0.6);
              border: 1px solid #5d4b32;
              border-radius: 8px;
              padding: 20px;
              line-height: 1.8;
              color: #d3b479;

              ::v-deep(strong) {
                color: #fada9b;
                font-size: 16px;
                margin-bottom: 8px;
                display: block;
              }

              ::v-deep(br) {
                margin-bottom: 6px;
              }
            }
          }
        }

        .loading-content {
          text-align: center;
          padding: 40px 0;
          color: #d3b479;
          font-size: 16px;

          p {
            margin: 0;
            text-indent: 0;
          }
        }

        .advanced-school-section {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }

          h4 {
            margin-top: 0;
            margin-bottom: 25px;
            font-size: 24px;
            text-align: center;
            color: #fada9b;
            text-shadow: 0 0 12px rgba(250, 218, 155, 0.5);
            background: linear-gradient(45deg, #d3b479 0%, #fada9b 50%, #d3b479 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .advanced-method-content {
            display: flex;
            flex-direction: column;
            gap: 25px;

            .advanced-method-text-row {
              display: flex;
              gap: 20px;

              .description-section,
              .techniques-section {
                flex: 1;
                background: rgba(45, 35, 25, 0.7);
                border: 1px solid #5d4b32;
                border-radius: 12px;
                padding: 20px;
                transition: all 0.3s;

                &:hover {
                  background: rgba(45, 35, 25, 0.9);
                  border-color: #d3b479;
                  box-shadow: 0 6px 20px rgba(211, 180, 121, 0.15);
                }

                h5 {
                  margin-top: 0;
                  margin-bottom: 15px;
                  color: #fada9b;
                  font-size: 18px;
                  text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);
                  border-bottom: 2px solid #5d4b32;
                  padding-bottom: 8px;
                  text-align: center;
                }

                div {
                  color: #e7cc80;
                  line-height: 1.8;

                  ::v-deep(br) {
                    line-height: 2.2;
                    margin-bottom: 8px;
                  }
                }
              }

              @media (max-width: 768px) {
                flex-direction: column;
                gap: 15px;
              }
            }

            .advanced-method-video-row {
              display: flex;
              flex-direction: column;
              align-items: center;

              h5 {
                margin-bottom: 15px;
                color: #fada9b;
                font-size: 18px;
                text-align: center;
                text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);
              }

              video {
                width: 100%;
                max-width: 600px;
                height: auto;
                border-radius: 12px;
                border: 3px solid #5d4b32;
                background: #000;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                transition: all 0.3s;

                &:hover {
                  border-color: #d3b479;
                  box-shadow: 0 8px 25px rgba(211, 180, 121, 0.3);
                  transform: scale(1.02);
                }
              }
            }
          }
        }

        // 师父传承最终秘籍样式
        .master-final-section {
          margin-bottom: 40px;

          &:last-child {
            margin-bottom: 0;
          }

          h4 {
            margin-top: 0;
            margin-bottom: 25px;
            font-size: 28px;
            text-align: center;
            color: #fada9b;
            text-shadow: 0 0 15px rgba(250, 218, 155, 0.8);
            background: linear-gradient(45deg, #d3b479 0%, #fada9b 30%, #e6d48f 70%, #d3b479 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 80px;
              height: 2px;
              background: linear-gradient(90deg, transparent, #d3b479, transparent);
            }
          }

          .master-final-description {
            text-align: center;
            margin-bottom: 30px;

            p {
              color: #e7cc80;
              font-size: 18px;
              font-style: italic;
              text-shadow: 0 0 5px rgba(231, 204, 128, 0.3);
              margin: 0;
            }
          }

          .master-final-content {
            background: rgba(40, 30, 20, 0.8);
            border: 2px solid #d3b479;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 8px 25px rgba(211, 180, 121, 0.2), inset 0 0 20px rgba(211, 180, 121, 0.1);
            position: relative;
            overflow: hidden;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(45deg, transparent 30%, rgba(211, 180, 121, 0.05) 50%, transparent 70%);
              pointer-events: none;
            }

            ::v-deep(.master-final-section) {
              h3 {
                color: #fada9b;
                font-size: 20px;
                margin-bottom: 15px;
                margin-top: 25px;
                text-shadow: 0 0 8px rgba(250, 218, 155, 0.4);
                position: relative;

                &:first-child {
                  margin-top: 0;
                }

                &::before {
                  content: '◆';
                  color: #d3b479;
                  margin-right: 8px;
                  text-shadow: 0 0 5px rgba(211, 180, 121, 0.5);
                }
              }

              p {
                color: #e7cc80;
                line-height: 1.8;
                margin-bottom: 12px;
                text-indent: 2em;

                &:last-child {
                  margin-bottom: 0;
                }
              }

              p[style*="color: #d3b479"] {
                text-indent: 0;
                text-align: center;
                font-size: 18px;
                line-height: 1.6;
                margin: 20px 0;
                padding: 15px;
                background: rgba(211, 180, 121, 0.1);
                border-radius: 8px;
                border: 1px solid rgba(211, 180, 121, 0.3);
              }

              p[style*="italic"] {
                text-indent: 0;
                text-align: center;
                font-size: 16px;
                margin-top: 25px;
                padding-top: 20px;
                border-top: 1px solid rgba(192, 170, 106, 0.3);
              }
            }
          }
        }
      }
    }
  }

  /* 动画定义 */
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
}

</style>