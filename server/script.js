import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  iteration: 1000,
};

export default function() {
  let randomArtist = Math.ceil((Math.random() * 375000) + 9625000);
  let res = http.get(`http://52.8.180.160:3002/artist/${randomArtist}/relatedArtists`);
  // let res = http.get(`http://localhost:3002/artist/${randomArtist}/relatedArtists`);
  // sleep(Math.random() * .25)
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 500,
  });
};
