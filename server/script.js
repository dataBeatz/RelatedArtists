import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 300,
  duration: "1m",
};

export default function() {
  let randomArtist = Math.ceil((Math.random() * 100000) + 9000000);
  let res = http.get(`http://localhost:3002/artist/${randomArtist}/relatedArtists`);
  sleep(Math.random() * .25);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 500,
  });
};