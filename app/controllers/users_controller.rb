class UsersController < ApplicationController
  
  def signup
  end

  def identification
    @user = User.find(current_user)
  end

  def card
  end

  def logout
  end

  def profile
    user = User.find(current_user)
    @profile = user.profile
  end
  
  
  def update
    user = User.find(current_user)
    @profile = user.profile
    
    @profile.update(profile_params)
    redirect_to tops_edit_path
  end
  
  private 
  def profile_params
    params.require(:profile).permit(:nickname, :comment)
  end
  
end
