import Vue from "vue";
import VueResource from "vue-resource";
import services from "./services";

Vue.use(VueResource);

const http = Vue.http;

http.options.root = "http://confiraloterias.com.br/api0/";

Object.keys(services).map(service => {
  services[service] = Vue.resource("", {}, services[service]);
});

export default services;

export { http };
