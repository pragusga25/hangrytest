import http from 'http';
import { routes } from './routes';

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  if (!url) throw new Error();

  const route = routes.find(({ method: rm, path }) => {
    let isMatch = false;
    if (path instanceof RegExp) {
      isMatch = path.test(url);
    } else {
      isMatch = path === url;
    }
    return isMatch && rm === method;
  });

  if (route) {
    const { service } = route;
    service(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      error: 'API not found',
      ok: false,
    })
  );
});

server.listen(3000, () => {
  console.log(`Server is running`);
});
