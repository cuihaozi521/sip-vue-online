<template>
  <sip-page>
    <sip-page-header>
      test
      <template slot="desc">testaafadf</template>
    </sip-page-header>
    <sip-page-body>
      <div> Name: {{name}}</div>
      <div> Regions: <span v-for="item in regionList">{{item.regionName}}({{item.regionId}}),</span> </div>
    </sip-page-body>
  </sip-page>
</template>
<script lang="ts" src="./test-http.ts"></script>
