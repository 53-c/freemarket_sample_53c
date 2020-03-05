class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :destroy, :update]
  before_action :set_category_and_brand_info, only: [:sell, :edit, :update, :create]

  def index
    @ladysitems = Item.eager_load(:category).eager_load(:order_status).where(categories:{grandparent_id: 1},order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @mensitems = Item.eager_load(:category).eager_load(:order_status).where(categories:{grandparent_id: 2},order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @babykidsitems = Item.eager_load(:category).eager_load(:order_status).where(categories:{grandparent_id: 3},order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @cosmeitems = Item.eager_load(:category).eager_load(:order_status).where(categories:{grandparent_id: 7},order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @zyaneruitems = Item.eager_load(:order_status).where(brand_id:1,order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @shufureemitems = Item.eager_load(:order_status).where(brand_id:4,order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @ruiwetonitems = Item.eager_load(:order_status).where(brand_id:3,order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
    @naigiitems = Item.eager_load(:order_status).where(brand_id:2,order_statuses:{status: 1}).order("items.id DESC").limit(4).includes(:item_images)
  end

  def show
    @comment = Comment.new
    @comments = @item.comments.includes(:user)

    @items = Item.where(user_id: @item.user.id).where.not(id: params[:id])
  end

  def sell
    @item = Item.new
    @item.build_brand
    @item.build_category
    @item.item_images.build

    @categories = Category.where(parent_id: 0)
    gon.category = Category.all

  end

  def create
    category_brand_params
    items_params
    @item = Item.new(@params_items)
   
    if @item.save
      @items_status = OrderStatus.create(status: 1, item_id: Item.all.last().id)
    else
      render :sell
      respond_to do |format|
        format.json
      end
    end
  end

  def edit
    @item.build_brand
    @item.build_category
    @item.item_images.build

    @categories = Category.where(parent_id: 0)

    gon.category = Category.all
    gon.category_user_select = Item.find(params[:id])
    gon.category_user_select_category = Item.find(params[:id]).category

    category_user_select_parent_category = Category.find_by(id: gon.category_user_select_category.parent_id)
    gon.category_user_select_child_category = Category.where(parent_id: category_user_select_parent_category.parent_id)
    gon.category_user_select_grandchild_category = Category.where(parent_id: gon.category_user_select_category.parent_id)
    gon.items_images = @item.item_images
  end

  def update
    @current_item_images = Item.find(params[:id]).item_images
    category_brand_params
    edit_items_params
    edit_images_params

    if @item.update(@edit_params_items)
      @delete_item_image_data.each do |delete_image|
        ItemImage.find(delete_image.to_i).destroy
      end

      @add_item_image_data.each do |add_image|
        ItemImage.create(add_image)
      end

      else
      respond_to do |format|
        format.json
      end
    end
  end

  def destroy
    @item.destroy
    redirect_to root_path
  end

  def selling
    @sellingitems = Item.where(sales_condition:0,user_id: current_user.id).order("id DESC")
  end

  def trading
    @tradingitems = Item.where(sales_condition:1,user_id: current_user.id).order("id DESC")
  end

  def sold
    @solditems = Item.where(sales_condition:1,user_id: current_user.id).order("id DESC")
  end

  def purchase
    @profile = Profile.where(user_id: current_user.id)
    @item = Item.find(params[:id])
    
    Payjp.api_key = ENV['PAYJP_TEST_SECRET_KEY']
    begin
      Payjp::Charge.create(currency: 'jpy', amount: @item.price, customer: @profile[0][:card_token])
    rescue
      render :confirm
    end
    
    @item.update(sales_condition: 1, buyer_id: current_user.id, selled_at: "#{DateTime.now}")

    @status = OrderStatus.find_by(item_id: params[:id])
    
    @status.update(status: 3)
    redirect_to complete_item_path(@item)
  end

  def confirm
    @item = Item.find(params[:id])
  end

  def complete
    @item = Item.find(params[:id])
  end

  def search
    @items = Item.where('name LIKE(?) OR detail LIKE(?)', "%#{params[:keyword]}%", "%#{params[:keyword]}%")

    if params[:q].present?
      # 検索フォームからアクセスした時の処理
      @search = Item.ransack(search_params)
      @items = @search.result
    else
      # 検索フォーム以外からアクセスした時の処理
      params[:q] = { sorts: 'id desc' }
      @search = Item.ransack()
      @items = Item.all
    end

    @keyword = Item.ransack(params[:q])
    @items = @keyword.result
    @q = Item.ransack(params[:q])
    @category = Category.where(id: 159..1000)
    
    @brands = Brand.all
    
    @items = @q.result.includes(:category, :brand)

  end

  private
  def search_params
    params.require(:q).permit(:sorts)
  end

  def category_brand_params
    @params_categories = params.require(:item).require(:category_attributes).permit(:id)

    @params_brands = params.require(:item).require(:brand_attributes).permit(:name)
    @params_brands = @brands.find_by(name: @params_brands[:name])
    if @params_brands.present?
      @params_brands = @params_brands[:id]
    end
  end

  def items_params
    @params_items = params.require(:item).permit(:name, :detail, :condition, :delivery_cost, :delivery_prefecture, :days_to_ship, :delivery_method, :price, item_images_attributes: [:image] ).merge(user_id: current_user.id, sales_condition: 0, category_id: @params_categories[:id], brand_id: @params_brands)
    params_int(@params_items)
  end

  def edit_items_params
    @edit_params_items = params.require(:item).permit(:name, :detail, :condition, :delivery_cost, :delivery_prefecture, :days_to_ship, :delivery_method, :price).merge(user_id: current_user.id, sales_condition: 0, category_id: @params_categories[:id], brand_id: @params_brands)
    params_int(@edit_params_items)
  end

  def edit_images_params
    @current_item_images_all_data = []
    @edit_all_image = []

    edit_images_params = params.require(:item).require(:item_images_attributes)

    @current_item_images.each do |current_image|
      @current_item_images_all_data << current_image.id.to_s
    end
    edit_images_params.each_value {|value|
      @edit_all_image << value[:image]
    }

    @delete_item_image_data = @current_item_images_all_data - @edit_all_image
    @add_item_image = @edit_all_image - @current_item_images_all_data

    @add_item_image_hash = {}
    @add_item_image_data = []

    @add_item_image.each do |image|
      @add_item_image_hash = {image: image, item_id: params[:id]}
      @add_item_image_data << @add_item_image_hash
    end
  end

  def params_int(model_params)
    model_params.each do |key,value|
      unless key == "item_images_attributes" 
        if integer_string?(value)
          model_params[key] = value.to_i
        end
      end
      if key == "item_images_attributes"
        model_params[key] = value 
      end
    end
  end

  def integer_string?(str)
    if str.present?
    Integer(str)
    true
    end
  rescue ArgumentError
    false
  end

  def set_item
    @item = Item.find(params[:id])
  end

  def set_category_and_brand_info
    @categories = Category.all
    @brands = Brand.all
  end

end
