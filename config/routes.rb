Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tops, only: [:index, :show, :new]
end
