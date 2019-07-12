class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def google
    session.clear
    # ユーザ登録まで自動的に実施せず、ユーザ検索のみ実施するように変更
    # メソッドはuser.rb側で定義します。
    @user = User.find_omniauth(request.env["omniauth.auth"])

    # 新規ユーザの場合、この時点ではDBレコードが存在しないので以下に変更
    if @user
      sign_in_and_redirect @user 
      set_flash_message(:notice, :success, :kind => "Google") if is_navigational_format?
    else
      # Facebookから取得した情報をsessionに格納
      session["devise.google_data"] = request.env["omniauth.auth"]

      # 新規ユーザの場合、`ユーザ名`登録用のテンプレートをrender
      @getname = ""
      @getemail = session["devise.google_data"]["info"]["email"]
      @user = User.new()
      render 'devise/registrations/after_omniauth_signup'
    end
  end

  def facebook

    # ユーザ登録まで自動的に実施せず、ユーザ検索のみ実施するように変更
    # メソッドはuser.rb側で定義します。
    @user = User.find_omniauth(request.env["omniauth.auth"])

    #if @user.persisted?
    # 新規ユーザの場合、この時点ではDBレコードが存在しないので以下に変更
    if @user
      sign_in_and_redirect @user 
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      # Facebookから取得した情報をsessionに格納
      session["devise.facebook_data"] = request.env["omniauth.auth"]

      # 新規ユーザの場合、`ユーザ名`登録用のテンプレートをrender
      @getemail = ""
      @getname = session["devise.facebook_data"]["extra"]["raw_info"]["name"]
      @user = User.new()
      render 'devise/registrations/after_omniauth_signup'
    end
  end

  def failure
    redirect_to root_path
  end

end