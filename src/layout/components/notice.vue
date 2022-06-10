
<script lang="ts" setup>
</script>
<template>
  <el-dropdown trigger='click'>
    <el-badge :value='6' type='danger' class='el-dropdown-link item mx-2 cursor-pointer leading-none'>
      <i class='el-icon-bell text-xl' />
    </el-badge>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs type='border-card' class='notice-tabs z-10'>
          <el-tab-pane label='通知' class='notice-tabs-pane'>
            <el-scrollbar class='scrollbar-wrapper'>

              <el-pagination
                layout='prev, pager, next'
                :total='1000'
                :hide-on-single-page='false'
                small
                :pager-count='5'
              />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label='关注' class='notice-tabs-pane'>
            <el-scrollbar class='scrollbar-wrapper' />
          </el-tab-pane>
          <el-tab-pane label='待办' class='notice-tabs-pane'>
            <el-scrollbar class='scrollbar-wrapper' />
          </el-tab-pane>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<style lang='postcss' scoped>
.notice-tabs {
    margin: -10px 0;
    border: none;
    width: 300px;
}

.notice-tabs-pane {
    height: 400px;
    overflow: hidden;
    margin: -15px;
}

.scrollbar-wrapper {
    padding: 15px;
}
</style>