import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    // 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});

export { client };
