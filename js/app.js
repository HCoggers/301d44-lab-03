'use strict';

function Horn(horn) {
  this.name = horn.title;
  this.imgurl = horn.image_url;
  this.alt = horn.description;
  this.class = horn.keyword;
  this.horns = horn.horns;
}

const hornKeys= [];
Horn.allHorns = [];

Horn.prototype.render = function(idx) {
  $('main').append(`<div class="${this.class}" id="Horn${idx}"></div>`);
  let hornClone = $(`#Horn${idx}`);

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.name);
  hornClone.find('img').attr('src', this.imgurl);
  hornClone.find('img').attr('class', this.class);
  hornClone.find('img').attr('alt', this.alt);
  hornClone.find('p').text(`Number of of horns: ${this.horns}`);
  if (!hornKeys.includes(this.class)){
    hornKeys.push(this.class);
    $('select').append(`<option value="${this.class}"> ${this.class} </option>`);
  };
}

Horn.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach( obj => {
        Horn.allHorns.push(new Horn(obj));
      });
    })
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach( obj => {
        Horn.allHorns.push(new Horn(obj));
      });
    })
    .then(Horn.loadHorns);
}





Horn.loadHorns = () => Horn.allHorns.forEach( (horn, idx) => horn.render(idx));
$(() =>   Horn.readJson());

$('select').on('change', (selection) => {
  console.log($('select :selected').val());
  const pictures = $('div').get();
  console.log('horned pictures', pictures);
  $('div').hide();
  pictures.forEach( val => {
    if(val.className === $('select :selected').val()){
      console.log($(`div .${val.className}`));
       $(`div.${val.className}`).show();
    };
  });
});