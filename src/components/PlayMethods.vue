          <!-- 第四种：实战演示 -->
          <div v-else-if="scriptureData.messageType === 'combat_training'" class="space-y-8">
            <div v-for="demo in scriptureData.combatDemos" :key="demo.name" class="combat-demo-item">
              <!-- 标题 -->
              <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-amber-400 mb-2">{{ demo.title }}</h3>
                <p class="text-amber-200 text-lg">{{ demo.description }}</p>
              </div>
              
              <!-- 视频演示 -->
              <div class="video-container mb-8">
                <h4 class="text-xl font-bold text-amber-300 mb-4 flex items-center">
                  <i class="fas fa-play-circle mr-2"></i>
                  实战演示视频
                </h4>
                <div class="video-wrapper rounded-lg overflow-hidden border-2 border-amber-600">
                  <video 
                    :src="demo.videoUrl" 
                    controls 
                    class="w-full h-auto bg-black"
                    :poster="'/images/video-placeholder.jpg'"
                  >
                    您的浏览器不支持视频播放
                  </video>
                </div>
              </div>
              
              <!-- 操作步骤 -->
              <div class="operation-steps">
                <h4 class="text-xl font-bold text-amber-300 mb-4 flex items-center">
                  <i class="fas fa-list-ol mr-2"></i>
                  详细操作步骤
                </h4>
                <div class="steps-content bg-gradient-to-br from-amber-900/30 to-orange-900/30 
                           rounded-lg border border-amber-600/50 p-6">
                  <div 
                    class="text-amber-100 leading-relaxed" 
                    v-html="demo.operationSteps"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 第三种：攻略内容 -->
          <div v-else-if="scriptureData.messageType === 'training_progress'" class="space-y-8"> 