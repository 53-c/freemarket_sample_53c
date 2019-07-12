  class Users::RegistrationsController < Devise::RegistrationsController
    prepend_before_action :check_captcha, only: [:create]
    prepend_before_action :customize_sign_up_params, only: [:create]
  
    before_action :configure_permitted_parameters, only: [:create]

    def new
      super
      resource.build_profile
      resource.build_address
    end

    def create
      super
      resource.save
    end

    def after_sign_up_path_for(resource)
      root_path
    end

    # if verify_recaptcha
    #   # 正常時に実行する処理
    # end

  
    protected
    def customize_sign_up_params
      devise_parameter_sanitizer.permit :sign_up, keys: [:username, :email, :password, :password_confirmation, :remember_me]
    end
  
    def check_captcha
      self.resource = resource_class.new sign_up_params
      resource.validate
      unless verify_recaptcha(model: resource)
        respond_with_navigational(resource) { render :new }
      end
    end
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys:[ profile_attributes: [:nickname, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :tel, :card_id, :money, :point, :comment, :user_id, :card_yy, :card_mm, :card_sec_id], address_attributes: [:zip, :prefectures, :city, :block, :building, :user_id, :first_name, :last_name,:first_name_kana, :last_name_kana, :tel]])
    end
end
