const fs = window.require('fs');
const ffmpeg = window.require('@ffmpeg-installer/ffmpeg');
const { spawn } = window.require('child_process');
import { store } from '@/store';
import { updateLibrary } from '@/store/libraryState';
// const path = window.require('path');
// const ffmpegPath = window.require('ffmpeg-static');
// const shell = window.require('any-shell-escape');
// const { exec } = window.require('child_process');
// const fetch = window.require('node-fetch');
// const formDataNode = window.require('form-data');
// const { importAnime } = require('goDLL');
// let ffmpeg = ffmpegPath;

interface Episode {
  path: string;
  img: string;
  id: number;
}

interface ITitle {
  id: string;
  title: string;
  episodes: Array<Episode>;
}

export const importFolder = (folderPath: string) => {
  fs.access('anime', (err: string) => {
    if (err) {
      fs.mkdirSync('anime');
      fs.mkdirSync('anime/temp');
    }
  });

  fs.readdir(folderPath, async (err: string, files: Array<string>) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    const episodes: Array<Episode> = [];
    const promises: Array<Promise<void>> = [];
    files.forEach((file, id) => {
      const animePath = `${folderPath}\\${file}`;
      promises.push(
        new Promise((resolve) => {
          const shellExec = [
            '-ss',
            '630',
            '-i',
            animePath,
            '-qscale:v',
            '7',
            '-frames:v',
            '1',
            '-y',
            `anime/temp/${id}.jpg`,
          ];
          const child = spawn(`${ffmpeg.path}`, shellExec);
          child.on('close', () => {
            episodes.push({
              path: animePath,
              img: `amine\\temp\\${id}.jpg`,
              id,
            });
            resolve();
          });
        }),
      );
    });
    await Promise.all(promises);
    const sortedEpisodes = episodes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    console.log(sortedEpisodes);
    const req = await fetch('https://api.trace.moe/search?anilistInfo', {
      method: 'POST',
      body: fs.readFileSync('anime/temp/0.jpg'),
      headers: { 'Content-type': 'image/jpeg' },
    });
    const data = await req.json();
    console.log(data);
    fs.access(
      `anime/${data.result[0].anilist.idMal.toString()}`,
      (err: string) => {
        if (err) {
          fs.mkdirSync(`anime/${data.result[0].anilist.idMal.toString()}`);
        }
        for (let i = 0; i < files.length; i++) {
          fs.rename(
            `anime/temp/${i}.jpg`,
            `anime/${data.result[0].anilist.idMal.toString()}/${i}.jpg`,
            (err: string) => {
              if (err) {
                console.log('move screenshot: ', err);
              }
            },
          );
        }
      },
    );
    const title = {
      id: data.result[0].anilist.idMal.toString(),
      title: data.result[0].anilist.title.romaji,
      episodes: sortedEpisodes.map((element) => ({
        ...element,
        img: `anime/${data.result[0].anilist.idMal.toString()}/${element.img.substring(
          11,
        )}`,
      })),
    };
    console.log(title);
    let db: Array<ITitle> = [];
    fs.access('anime/anime.json', (err: string) => {
      if (!err) {
        fs.readFile('anime/anime.json', (err: string, data: string) => {
          if (err) console.log(err);
          if(!err){
            console.log(JSON.parse(data))
            db = JSON.parse(data);
            console.log(db)
          }
        });
      }
      if (err) {
        console.log(err);
      }
      db.push(title);
      fs.writeFile('anime/anime.json', JSON.stringify(db), (err: string) => {
        if (err) {
          console.log('write bd error: ', err);
        }
        if(!err){
          store.dispatch(updateLibrary(db));
        }
      });
    });
  });
};

export const getLocalLibrary = async () => {
  const a = await new Promise((resolve) => {
    fs.access('anime/anime.json', (err: string) => {
      if (err) {
        resolve([])
      }
      if(!err){
        fs.readFile('anime/anime.json', (err: string, data: string) => {
          if (err) resolve([]);
          resolve(JSON.parse(data));
        });
      }
    });
  });
  return a
};
