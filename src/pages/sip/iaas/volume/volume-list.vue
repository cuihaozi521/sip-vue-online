<template>
  <sip-page>
    <sip-page-header>
      存储
      <template slot="desc">存储描述</template>
    </sip-page-header>
    <sip-page-body>
      <sip-page-toolbar>
        <Button @click="tableManager.refresh()">
          <Icon type="ios-refresh" size="24" />
        </Button>

        <Button type="primary" @click="create()" v-sip-access:create>
          <Icon type="md-create"/>创建
        </Button>
        <Dropdown trigger="click">
          <Button>更多操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-sip-click="bindToInstance" v-sip-access:bindToInstance>挂接实例</DropdownItem>
            <DropdownItem v-sip-click="detachVolume" v-sip-access:detachVolume>删除存储</DropdownItem>
            <DropdownItem divided disabled>测试</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown @on-click="changeTagsMenu">
          <Button>
            <Icon type="ios-pricetags-outline"/>标签
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu v-for="(item,index) in tags" :key="index" slot="list">
            <Dropdown placement="right-start">
              <DropdownItem :name="item.key">
                {{ item.name }}
                <Icon v-if="item.children" type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem v-for="(eItem, index) in item.children" :key="index" :name="eItem.key">{{ eItem.name }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </DropdownMenu>
        </Dropdown>

        <Input
          style="display: inline-block;width:250px"
          @on-search="searchInput"
          search
          placeholder="搜索"
        />

        <Button @click="exportData(1)" v-sip-access:exportData>
          <Icon type="ios-download-outline"></Icon>导出
        </Button>
      </sip-page-toolbar>

      <div ref="tagBlock">
        <Tag
          type="border"
          v-for="(item, index) in tagsList" :key="index"
          closable
          @on-close="handleClose(index)"
        >{{ item }}</Tag>
      </div>

      <sip-table :manager="tableManager">
        <sip-table-formatter column="Title">
          <template slot-scope="{row, column, cellValue, cellText, index}">
            <a v-sip-click="detail">{{cellValue}}</a>
          </template>
        </sip-table-formatter>
        <sip-table-formatter column="Volumn_Status">
          <template slot-scope="{row, column, cellValue, cellText, index}">
            <Tag type="dot" :color="status.$className(cellValue)">{{cellText}}</Tag>
          </template>
        </sip-table-formatter>
      </sip-table>

    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./volume-list.ts"></script>
