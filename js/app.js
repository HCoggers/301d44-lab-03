'use strict';

function Horn(horn) {
  this.name = horn.title;
  this.imgurl = horn.image_url;
  this.alt = horn.description;
  this.class = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function(idx) {
  $('main').append(`<div class="clone" id="Horn${idx}"></div>`);
  let hornClone = $(`#Horn${idx}`);

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.name);
  hornClone.find('img').attr('src', this.imgurl);
  hornClone.find('img').attr('class', this.class);
  hornClone.find('img').attr('alt', this.alt);
  hornClone.find('p').text(`Number of of horns: ${this.horns}`);
}

Horn.readJson = () => {
  $.get('../data/page-1.json', 'json')
    .then(data => {
      data.forEach( obj => {
        Horn.allHorns.push(new Horn(obj));
      })
    })
    .then(Horn.loadHorns)
}

Horn.loadHorns = () => Horn.allHorns.forEach( (horn, idx) => horn.render(idx));

$(() => Horn.readJson());