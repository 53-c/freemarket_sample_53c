$(document).on('turbolinks:load', function() {

var pages = $('.section');
pages.hide();
pages.eq(0).fadeIn();

  $('.next-step').click(function(e) {
    $('.error-notice-signin').text("")
    var nickname = $('#nickname').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirmation = $('#password_confirmation').val();
    var last_name = $('#last_name').val();
    var first_name = $('#first_name').val();
    var last_name_kana = $('#last_name_kana').val();
    var first_name_kana = $('#first_name_kana').val();
    var birthday = $('#birthday').val();
    if(nickname == "")
    {
      $('#error-nicnname').text("ニックネーム を入力してください");
    };
    if(document.getElementById('error-email'))
    {
        if(email == "")
        {
          $('#error-email').text("メールアドレス を入力してください");
        };
        if(!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/))
        {
          $('#error-email1').text("フォーマットが不適切です");
        };
        if(password == "")
        {
          $('#error-password').text("パスワード を入力してください");
        };
        if(!password.match(/^[a-z\d]{6,128}$/i))
        {
          $('#error-password1').text("パスワードは6文字以上128文字以下で入力してください");
        };
        if(password_confirmation == "")
        {
          $('#error-password_confirmation').text("パスワード (確認) を入力してください");
        };
        if(password_confirmation != password)
        {
          $('#error-password_confirmation1').text("パスワードが一致しません")
        };
    }
    if(last_name == "")
    {
      $('#error-last_name').text("姓 を入力してください");
    };
    if(first_name == "")
    {
      $('#error-first_name').text("名 を入力してください");
    };
    if(last_name_kana == "")
    {
      $('#error-last_name_kana').text("姓カナ を入力してください");
    };
    if(!last_name_kana.match(/^[ァ-ロワヲンー 　\r\n\t]*$/))
    {
      $('#error-last_name_kana1').text("姓カナ はカナ文字を入力してください");
    };
    if(first_name_kana == "")
    {
      $('#error-first_name_kana').text("名カナ を入力してください");
    };
    if(!first_name_kana.match(/^[ァ-ロワヲンー 　\r\n\t]*$/))
    {
      $('#error-first_name_kana1').text("名カナ はカナ文字を入力してください");
    };
    if(birthday == "")
    {
      $('#error-birth_date').text("生年月日を入力してください");
    };
    
    if($('.error-notice-signin').text().length == 0)
    {
    e.preventDefault();
    pages.hide();
    pages.eq(1).fadeIn();
    }
  });

  $('.next-step1').click(function(e) {
    $('.error-notice-signin').text("")
    var nickname = $('#nickname').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var password_confirmation = $('#password_confirmation').val();
    var last_name = $('#last_name').val();
    var first_name = $('#first_name').val();
    var last_name_kana = $('#last_name_kana').val();
    var first_name_kana = $('#first_name_kana').val();
    var birthday = $('#birthday').val();
    if(nickname == "")
    {
      $('#error-nicnname').text("ニックネーム を入力してください");
    };
    if(document.getElementById('error-email'))
    {
        if(email == "")
        {
          $('#error-email').text("メールアドレス を入力してください");
        };
        if(!email.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/))
        {
          $('#error-email1').text("フォーマットが不適切です");
        };
    }
    if(last_name == "")
    {
      $('#error-last_name').text("姓 を入力してください");
    };
    if(first_name == "")
    {
      $('#error-first_name').text("名 を入力してください");
    };
    if(last_name_kana == "")
    {
      $('#error-last_name_kana').text("姓カナ を入力してください");
    };
    if(!last_name_kana.match(/^[ァ-ロワヲンー 　\r\n\t]*$/))
    {
      $('#error-last_name_kana1').text("姓カナ はカナ文字を入力してください");
    };
    if(first_name_kana == "")
    {
      $('#error-first_name_kana').text("名カナ を入力してください");
    };
    if(!first_name_kana.match(/^[ァ-ロワヲンー 　\r\n\t]*$/))
    {
      $('#error-first_name_kana1').text("名カナ はカナ文字を入力してください");
    };
    if(birthday == "")
    {
      $('#error-birth_date').text("生年月日を入力してください");
    };
    
    if($('.error-notice-signin').text().length == 0)
    {
    e.preventDefault();
    pages.hide();
    pages.eq(1).fadeIn();
    }
  });

  $('.next-step2').click(function(e) {
    $('.error-notice-signin').text("")
    var tel = $('#phone_number').val();
    if(tel == "")
    {
      $('#error-phone_number').text("電話番号 を入力してください");
    };
    if($('.error-notice-signin').text().length == 0)
    {
    e.preventDefault();
    pages.hide();
    pages.eq(2).fadeIn();
    }
  });

  $('.next-step3').click(function(e) {
    $('.error-notice-signin').text("")
    var last_name = $('#d_last_name').val();
    var first_name = $('#d_first_name').val();
    var last_name_kana = $('#d_last_name_kana').val();
    var first_name_kana = $('#d_first_name_kana').val();
    var zipcord = $('#zipcord').val();
    var prefecture = $('#prefecture').val();
    var city = $('#city').val();
    var address = $('#address').val();
    var building_name = $('#building_name').val();
    var tel = $('#tel').val();

    if(last_name == "")
    {
      $('#error-d_last_name').text("姓 を入力してください");
    };
    if(first_name == "")
    {
      $('#error-d_first_name').text("名 を入力してください");
    };
    if(last_name_kana == "")
    {
      $('#error-d_last_name_kana').text("姓カナ を入力してください");
    };
    if(!last_name_kana.match(/^[ァ-ロワヲンー 　\r\n\t]*$/))
    {
      $('#error-d_last_name_kana1').text("姓カナ はカナ文字を入力してください");
    };
    if(first_name_kana == "")
    {
      $('#error-d_first_name_kana').text("名カナ を入力してください");
    };
    if(!first_name_kana.match(/^[ァ-ロワヲンー 　\r\n\t]*$/))
    {
      $('#error-d_first_name_kana1').text("名カナ はカナ文字を入力してください");
    };
    if(zipcord == "")
    {
      $('#error-zipcord').text("郵便番号 を入力してください");
    };
    if(prefecture == "")
    {
      $('#error-prefecture').text("都道府県 を入力してください");
    };
    if(city == "")
    {
      $('#error-city').text("市区町村 を入力してください");
    };
    if(address == "")
    {
      $('#error-address').text("番地 を入力してください");
    };
    if($('.error-notice-signin').text().length == 0)
    {
    e.preventDefault();
    pages.hide();
    pages.eq(3).fadeIn();
    }
  })

  $('.next-step4').click(function (e) {
    $('.error-notice-signin').text("")
    var number = $('#number').val();
    var month = $('#month').val();
    var year = $('#year').val();
    var security_code = $('#security_code').val();
    if(number == "")
    {
      $('#error-number').text("カード番号 を入力してください");
    };
    if(!number.match(/^\d+$/))
    {
      $('#error-number1').text("カード番号は半角数字 で入力してください");
    };
    if(month == "--")
    {
      $('#error-month').text("有効期限(月) を入力してください");
    };
    if(year == "--")
    {
      $('#error-year').text("有効期限(年) を入力してください");
    };
    if(security_code == "")
    {
      $('#error-security_code').text("セキュリティコード を入力してください");
    };
    if(!security_code.match(/^\d+$/))
    {
      $('#error-security_code1').text("セキュリティコードは半角数字 で入力してください");
    };
    if(security_code.length != 3 && security_code.length != 4)
    {
      $('#error-security_code2').text("セキュリティコードは３桁または４桁です");
    };
    if($('.error-notice-signin').text().length == 0)
    {
    pages.hide();
    pages.eq(4).fadeIn();
    }
    else{return false;};
  })
});
