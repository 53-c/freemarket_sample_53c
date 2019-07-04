$(document).on('turbolinks:load', function(){


function display_image(files){
var  reader = new FileReader();
var  display_preview = $("#preview");
var  new_input = `
                    <label id = "file-drop-zone1">
                    <input class="file-send-btn" multiple="multiple" type="file" 
                    name="item[item_images_attributes][0][image][]" id="item_item_images_attributes_0_image">
                    <id = "preview" >
                  `
// ファイル読み込みが完了した際のイベント登録
reader.onload = (function(files) {
return function(e) {
  //既存のプレビューを削除
  // .prevewの領域の中にロードした画像を表示するimageタグを追加
  display_preview.append($('<img>').attr({
            src: e.target.result,
            width: "114px",
            class: "preview",
            title: files.name
        }));
};
})(files);
reader.readAsDataURL(files);
$("#file-drop-zone").css({
  "width" : "20%",
  "float" : "right",
  "pointer-events": "none"
});
// $("#file-drop-zone").remove();
$(".sell-box_container__drop-box__text__second").append(new_input);
$("#file-drop-zone1").css({
  "width" : "80%",
  "display" : "block",
  "float" : "left",
  "height" : "162px"

});


};

//drop zoneの実装
function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  $files = evt.dataTransfer.files[0];
  display_image($files);

}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; 
}

// イベントリスナーを設定
var dropZone = document.getElementById('file-drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

$('.new_item').on('submit', function(e){
  e.preventDefault();  
  let formdata = new FormData(this);
  if(typeof $files != 'undefined'){
    formdata.append('item[item_images_attributes][0][image]',$files);
  }

  $.ajax({
    url: 'http://localhost:3000/items',
    type: "POST",
    data: formdata,
    cache: false,
    processData: false,
    contentType: false,
    dataType: 'html'
  })

  .done(function(data, textStatus, jqXHR){
  })
  .fail(function(jqXHR, textStatus, errorThrown){
  })
});

$('input[type="file"]').on('change', function(e){
  var image_file = e.target.files[0];
  display_image(image_file);
});

$(".price_input").on("keyup", function(){
  $(".right-price").empty();
  $(".right-price-maney").empty();

  var input = $(".price_input").val(),
      fee = $(".right-price"),
      fee_maney = Math.floor(input * 0.1),
      maney = $(".right-price-maney"),
      get_maney = (input - fee_maney).toLocaleString();
      chn_get_maney = "¥" + get_maney;

      if (input >= 300 && input <= 9999999){
        fee.append(fee_maney.toLocaleString());
        maney.append(chn_get_maney);
        }
      else {
        fee.append("-----");
        maney.append("-----");
      }
});

});
