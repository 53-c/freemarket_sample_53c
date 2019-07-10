$(document).on('turbolinks:load', function(){
  console.log(location.pathname);
  // gon.category_user_select.id

  if(location.pathname == )

  function calcManey(input){
    fee = $(".right-price");
    fee_maney = Math.floor(input * 0.1);
    maney = $(".right-price-maney");
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
  }

  $(".price_input").on("keyup", function(){
    console.log(1);
    $(".right-price").empty();
    $(".right-price-maney").empty();
    var input = $(".price_input").val();
    calcManey(input);
  });
});
  