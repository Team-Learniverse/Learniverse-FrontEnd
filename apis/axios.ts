import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    // 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});

const media = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDIA_IP,
});

const ai = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_IP,
});

const mainGetFetcher = (url: string) => client.get(url).then((res) => res.data);

const mediaGetFetcher = (url: string) => media.get(url).then((res) => res.data);

const aiGetFetcher = (url: string) => ai.get(url).then((res) => res.data);

export { client, media, ai, mainGetFetcher, mediaGetFetcher, aiGetFetcher };
