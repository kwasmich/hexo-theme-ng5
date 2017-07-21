'use strict';

const path = require('path');
const gm = require('gm');

function getImageSize(img_path) {
    return new Promise((resolve, reject) => {
        gm(img_path).size(function (err, size) {
            if (!err) {
                console.log(size);
                resolve(size);
            } else {
                console.error(err);
                reject(err);
            }
        });
    });
}


async function sized_image(...args) {
    const img_path = path.join(hexo.base_dir, "source", this.page.path.substr(0, this.page.path.lastIndexOf("/")), args[0]);
    // const PostAsset = hexo.model('PostAsset');
    // const asset = PostAsset.findOne({post: this._id, slug: args[0]});
    // const path = this.url_for(args[0]);
    // console.log(this, this._id, path, asset, args);
    // console.log(hexo.locals.toObject());
    const size = await getImageSize(img_path);
    console.log(size);
    console.log(gm(img_path).size());
    console.log(img_path);
    return args;
}

console.log(hexo.base_dir);

hexo.extend.helper.register('sized_image', sized_image);


function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  var a = resolveAfter2Seconds(20);
  var b = resolveAfter2Seconds(30);
  return x + await a + await b;
}

add1(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});

async function add2(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});
