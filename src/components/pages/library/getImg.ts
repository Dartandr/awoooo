const ffmpeg = window.require('@ffmpeg-installer/ffmpeg');
const fs = window.require('fs');
const fetch = window.require('node-fetch');
const shell = window.require('any-shell-escape');
const { exec } = window.require('child_process');


interface IAminiList{
  id: number,
  idMal: number,
  isAdult: boolean,
}

interface IAnimeResult{
  anilist: IAminiList,
  episode: number | null,
  filename: string,
  from: number,
  image: string,
  similarity: number,
  to: number,
  video: string
}

interface IAnimeSearch {
  error: string,
  frameCount: number,
  result: Array<IAnimeResult>
}

const getAnime = (animePath: string): void => {
  fs.access('anime', (err: string) => {
    if (err) {
      fs.mkdirSync('anime');
    }
  });
  const shellExec = shell([
    ffmpeg.path,
    '-ss',
    '630',
    '-i',
    animePath,
    '-qscale:v',
    '7',
    '-frames:v',
    '1',
    '-y',
    `anime/0.jpg`,
  ]);
  exec(shellExec, async (err: string) => {
    if (err) {
      console.log(err);
    } else {
      await fetch('https://api.trace.moe/search?anilistInfo', {
        method: 'POST',
        body: fs.readFileSync('anime/0.jpg'),
        headers: { 'Content-type': 'image/jpeg' },
      })
        .then((e: Response) => e.json())
        .then((json: IAnimeSearch) => console.log(json.result[0]));
    }
  });
};

export default getAnime;
