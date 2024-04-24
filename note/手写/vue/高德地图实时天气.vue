
<template>
  <div id="container"></div>
  <a href="https://mp.weixin.qq.com/s/AkqY54wb3DxDWPqzRS2eLQ">利用高德地图API实现实时天气</a>
</template>

<script setup lang="ts">
// npm install @amap/amap-jsapi-loader --save
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, onMounted, watch, reactive } from "vue";
const props = defineProps({
  search: {
    type: String,
    default: "杭州市",
  },
});

const isFalse = ref(false);

const map = ref<any>(null);
let locationArr = ref<any>();
watch(
  () => props.search,
  (newValue) => {
    console.log("search", newValue);
    initMap();
  }
);
function initMap() {
  AMapLoader.load({
    key: "申请好的Web端开发者Key", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.ToolBar",
      "AMap.Scale",
      "AMap.HawkEye",
      "AMap.MapType",
      "AMap.Geolocation",
      "AMap.Geocoder",
      "AMap.Weather",
      "AMap.CitySearch",
      "AMap.InfoWindow",
      "AMap.Marker",
      "AMap.Pixel",
    ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map.value = new AMap.Map("container", {
        //设置地图容器id
        resizeEnable: true,
        viewMode: "3D", //是否为3D地图模式
        zoom: 10, //初始化地图级别
        center: locationArr.value, //初始化地图中心点位置
      });

      getGeolocation(AMap);
      getCitySearch(AMap, map.value);
    })
    .catch((e) => {
      console.log(e);
    });
}

// 浏览器定位
const getGeolocation = (AMap: any) => {
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, //是否使用高精度定位，默认:true
    timeout: 1000, //超过10秒后停止定位，默认：5s
    position: "RB", //定位按钮的停靠位置
    offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
    zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
  });
  map.value.addControl(geolocation);
  geolocation.getCurrentPosition(function (status: string, result: any) {
    if (status == "complete") {
      onComplete(result);
    } else {
      onError(result);
    }
  });
};

// IP定位获取当前城市信息
const getCitySearch = (AMap: any, map: any) => {
  const citySearch = new AMap.CitySearch();
  citySearch.getLocalCity(function (
    status: string,
    result: {
      city: string;
      info: string;
    }
  ) {
    if (status === "complete" && result.info === "OK") {
      console.log(
        "🚀 ~ file: map-container.vue:88 ~ getCitySearch ~ result:",
        result
      );
      // 查询成功，result即为当前所在城市信息
      getWeather(AMap, map, result.city);
    }
  });
};

// 天气
const getWeather = (AMap: any, map: any, city: string) => {
  const weather = new AMap.Weather();
  weather.getLive(
    city,
    function (
      err: any,
      data: {
        city: string;
        weather: string;
        temperature: string;
        windDirection: string;
        windPower: string;
        humidity: string;
        reportTime: string;
      }
    ) {
      console.log("🚀 ~ file: map-container.vue:96 ~ .then ~ data:", data);
      if (!err) {
        const str = [];
        str.push("<h4 >实时天气" + "</h4><hr>");
        str.push("<p>城市/区：" + data.city + "</p>");
        str.push("<p>天气：" + data.weather + "</p>");
        str.push("<p>温度：" + data.temperature + "℃</p>");
        str.push("<p>风向：" + data.windDirection + "</p>");
        str.push("<p>风力：" + data.windPower + " 级</p>");
        str.push("<p>空气湿度：" + data.humidity + "</p>");
        str.push("<p>发布时间：" + data.reportTime + "</p>");
        const marker = new AMap.Marker({
          map: map,
          position: map.getCenter(),
        });
        const infoWin = new AMap.InfoWindow({
          content:
            '<div class="info" style="position:inherit;margin-bottom:0;background:#ffffff90;padding:10px">' +
            str.join("") +
            '</div><div class="sharp"></div>',
          isCustom: true,
          offset: new AMap.Pixel(0, -37),
        });
        infoWin.open(map, marker.getPosition());
        marker.on("mouseover", function () {
          infoWin.open(map, marker.getPosition());
        });
      }
    }
  );

  // 未来4天天气预报
  weather.getForecast(
    city,
    function (err: any, data: { forecasts: string | any[] }) {
      console.log(
        "🚀 ~ file: map-container.vue:186 ~ getWeather ~ data:",
        data
      );

      if (err) {
        return;
      }
      var strs = [];
      for (var i = 0, dayWeather; i < data.forecasts.length; i++) {
        dayWeather = data.forecasts[i];
        strs.push(
          `<p>${dayWeather.date} ${dayWeather.dayWeather} ${dayWeather.nightTemp}~${dayWeather.dayTemp}℃</p><br />`
        );
      }
    }
  );
};

function onComplete(data: any) {
  console.log("🚀 ~ file: map-container.vue:107 ~ onComplete ~ data:", data);
  const lngLat = [data.position.lng, data.position.lat];
  locationArr.value = lngLat;
}

function onError(data: any) {
  console.log("🚀 ~ file: map-container.vue:113 ~ onError ~ data:", data);
  // 定位出错
}

onMounted(() => {
  initMap();
});
</script>

<style scoped lang="less">
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>