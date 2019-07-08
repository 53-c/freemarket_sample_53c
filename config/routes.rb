Rails.application.routes.draw do

  devise_for :users,
  controllers: {
  registrations: 'users/registrations',
  omniauth_callbacks: 'users/omniauth_callbacks'
  }

  root "tops#index"
  get 'mypage/identification' => 'users#identification'
  get 'mypage/card' => 'users#card'
  get 'signup' => 'users#signup'
  get 'logout' => 'users#logout'
  get 'sell' => 'items#sell'

  get  'new' => 'registrations#new'
  get  'address' => 'registrations#address'
  get  'create' => 'registrations#create'
  get  'credit' => 'registrations#credit'
  get  'sns' => 'registrations#sns'
  get  'phone' => 'registrations#phone'

  # For details on the DSL available within this file, see http://guide.rubyonrails.org/routing.html
  get 'mypage' => 'users#show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'tops/edit' => 'tops#edit'
  get 'profile' => 'users#profile'
  get 'search' => 'items#search'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :items do
    collection do
      post 'purchase'
    end
    collection do
      get 'complete'
    end
  end
  resources :tops, only: [:index, :new, :edit]
  resources :users, only: [:index, :update]

end
