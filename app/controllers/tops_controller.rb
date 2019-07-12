class TopsController < ApplicationController

  def index
    @ladysitems = Item.all.eager_load(:category).where(categories:{grandparent_id: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @mensitems = Item.all.eager_load(:category).where(categories:{grandparent_id: 2}).order("items.id DESC").limit(4).includes(:item_images)
    @babykidsitems = Item.all.eager_load(:category).where(categories:{grandparent_id: 3}).order("items.id DESC").limit(4).includes(:item_images)
    @cosmeitems = Item.all.eager_load(:category).where(categories:{grandparent_id: 7}).order("items.id DESC").limit(4).includes(:item_images)
    @zyaneruitems = Item.where(brand_id:1).order("id DESC").limit(4).includes(:item_images)
    @shufureemitems = Item.where(brand_id:4).order("id DESC").limit(4).includes(:item_images)
    @ruiwetonitems = Item.where(brand_id:3).order("id DESC").limit(4).includes(:item_images)
    @naigiitems = Item.where(brand_id:2).order("id DESC").limit(4).includes(:item_images)
  end

  def edit
    @user = User.find(current_user)
  end
end
