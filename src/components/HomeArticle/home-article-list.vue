<script setup>
import { nextTick, watch } from "vue";
import { useRouter } from "vue-router";

import { numberFormate } from "@/utils/tool";

import ArticleSkeleton from "./components/article-skeleton.vue";
import Tooltip from "../ToolTip/tooltip.vue";
import Pagination from "../Pagination/pagination.vue";
import GsapCount from "@/components/GsapCount/index.vue";

import { gsapTransY } from "@/utils/transform";
import { isMobile } from "@/utils/tool";

const emit = defineEmits(["pageChange"]);

const props = defineProps({
  articleList: {
    type: Array,
    default: () => {},
  },
  articleTotal: {
    type: Number,
    default: 0,
  },
  param: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

/* 文章操作 start */
const operate = (type, item) => {
  switch (type) {
    case "detail":
      router.push({ path: "/article", query: { id: item.id } });
      break;
    case "tag":
      router.push({ path: "/tag" });
      break;
    case "category":
      router.push({ path: "/category" });
      break;
  }
};
/* 文章操作 end */

let layout = " prev, pager, next"; //分页组件会展示的功能项

const pagination = (page) => {
  emit("pageChange", page);
};

watch(
  () => props.articleList,
  () => {
    if (!props.articleList.length) return;
    nextTick(() => {
      let listArticle = [];
      for (let i = 0; i < props.articleList.length; i++) {
        if (!isMobile()) {
          if (i >= 1) {
            listArticle.push(".article" + i);
          }
        } else {
          listArticle.push(".article" + i);
        }
      }
      gsapTransY(listArticle, 30, 0.3, "none");
    });
  }
);
</script>

<template>
  <el-row class="root">
    <template v-if="param.loading">
      <el-col v-for="item in 5" :key="item">
        <el-card class="card-hover">
          <div class="article-box">
            <el-skeleton :loading="param.loading" style="height: 100%" animated>
              <template #template>
                <ArticleSkeleton />
              </template>
            </el-skeleton>
          </div>
        </el-card>
      </el-col>
    </template>
    <template v-else>
      <template v-if="articleList.length">
        <el-col
          :class="['article-col', 'article' + index]"
          v-for="(item, index) in articleList"
          :key="item.id"
        >
          <el-card class="card-hover">
            <div
              class="article-box"
              :style="{
                'flex-direction': index % 2 == 0 ? 'row' : 'row-reverse',
              }"
            >
              <div
                :class="['article-cover', 'article-cover' + index]"
                @click="operate('detail', item)"
              >
                <div
                  v-image="item.image"
                  class="scale flex justify-center items-center"
                  style="width: 100%; height: 100%"
                >
                  <el-image :src="item.image" fit="cover" class="image">
                    <template #error>
                      <svg-icon name="image404" :width="15" :height="15"></svg-icon>
                    </template>
                  </el-image>
                </div>
              </div>
              <!-- 信息 -->
              <div class="article-info flex_c_between">
                <span
                  class="title text_overflow"
                  :title="item.title"
                  @click="operate('detail', item)"
                >
                  {{ item.title }}
                </span>
                <div class="meta">
                  <span class="to_pointer">
                    <i class="iconfont icon-calendar2"></i>
                    <span class="meta-label">发表于</span>
                    <span class="meta-value">{{ item.publishTime }}</span>
                  </span>
                  <span class="article-meta__separator"></span>
                  <span class="to_pointer" @click="operate('category', item)">
                    <i class="iconfont icon-folder"></i>
                    <span class="meta-value">{{ item.category }}</span>
                  </span>
                  <span class="article-meta__separator"></span>
                  <span class="to_pointer">
                    <i class="iconfont icon-chakan">{{ item.views }}</i>
                  </span>
                </div>
                <Tooltip
                  width="100%"
                  size="1.2rem"
                  align="left"
                  :lineHeight="3"
                  :name="item.introduction"
                />
              </div>
            </div>
            <!-- 图片 -->
          </el-card>
        </el-col>
      </template>
      <template v-else>
        <div class="no-article">暂无文章，请先到后台发布文章～</div>
      </template>
    </template>
    <Pagination
      class="!mt-[2rem]"
      :size="param.size"
      :current="param.current"
      :layout="layout"
      :total="articleTotal"
      @pagination="pagination"
    />
  </el-row>
</template>

<style lang="scss" scoped>
.article-cover {
  .image {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    display: grid;
    place-items: center;
  }
}

.no-article {
  color: var(--font-color);
  width: 100%;
  height: 80vh;
  line-height: 80vh;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.article-info {
  flex: 1;
  .title {
    display: inline-block;
    width: 100%;
    font-size: 1.6rem;
    color: var(--font-color);
    font-weight: 600;
    line-height: 2.4;
    transition: 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }

  .meta {
    color: var(--meta-color);
    line-height: 1.4;
    font-size: 100%;
    font-weight: 500;

    .icon-zhiding {
      font-size: 1rem;
      color: var(--top);
    }

    &-label {
      padding-right: 0.2rem;
    }

    &-value {
      padding-right: 0.2rem;
    }

    .icon-label_fill {
      font-size: 1.2rem;
    }

    .icon-icon1 {
      font-size: 1.2rem;
    }

    .icon-chakan {
      font-size: 1.2rem;
    }

    .article-meta__separator {
      margin: 0 0.4rem;
      font-size: 1.1rem;
      position: relative;

      &::after {
        content: "|";
        position: absolute;
        top: -3px;
        right: 0;
      }
    }

    i {
      margin: 0 0.2rem 0 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .article-box {
    display: flex;
    justify-content: space-around;
    flex-direction: column !important;
    align-items: center;
    height: 28rem;
  }

  .article-cover {
    width: 100%;
    height: 14rem;
    overflow: hidden;
  }

  .article-info {
    flex: 1;
    width: 100%;
    padding: 1rem 1.5rem;
    overflow: hidden;
    display: inline-block;
  }
}

// pc
@media screen and (min-width: 768px) {
  .article-box {
    display: flex;
    align-items: center;
    height: 16rem;
  }

  .article-cover {
    width: 40%;
    height: 100%;
    overflow: hidden;
  }

  .article-info {
    width: 55%;
    padding: 0 20px;
    overflow: hidden;
    display: inline-block;
  }
}
</style>
