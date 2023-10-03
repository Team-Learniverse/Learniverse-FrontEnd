import axios from 'axios';

const client = axios.create({
  baseURL: 'https://learniverse-main.kro.kr/',
  headers: {
    'Content-type': 'application/json',
    // 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});

const media = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDIA_IP,
});

export { client, media };
