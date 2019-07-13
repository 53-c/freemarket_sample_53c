Rails.application.routes.draw do

  devise_for :users,
  controllers: {
  registrations: 'users/registrations',
  omniauth_callbacks: 'users/omniauth_callbacks'
  }

  root "tops#index"
  get 'mypage/profile' => 'users#profile'
  get 'mypage/identification' => 'users#identification'
  get 'mypage/card' => 'users#card'
  get 'signup' => 'users#signup'
  get 'logout' => 'users#logout'
  get 'sell' => 'items#sell'
  get 'mypage' => 'users#show'
  get 'tops/edit' => 'tops#edit'
  
  resources :items do
    collection do
      post 'purchase'
    end
    collection do
      get 'complete'
    end
    collection do
      get 'search'
    end
    member do 
      get :download
    end
    resources :comments, only: [:create]
  end
  resources :tops, only: [:index, :new, :edit]
  resources :users, only: [:index, :update]

end
