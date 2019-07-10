class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit]
  before_action :set_category_and_brand_info, only: [:sell, :edit, :update, :create]


  def index
    
  end

  def new
    
  end

  def show
  end

  def sell
    @item = Item.new
    @item.build_brand
    @item.build_category
    @item.item_images.build

    @categories = Category.where(parent_id: 0)
    gon.category = Category.all

  end
  def edit
    @item.build_brand
    @item.build_category
    @item.item_images.build

    @categories = Category.where(parent_id: 0)
    gon.category = Category.all
    gon.category_user_select = Item.find(params[:id])
    gon.category_user_select_category = Item.find(params[:id]).category
    gon.items_images = @item.item_images
  end

  def update
    items_params
    @item = Item.new(@params_item)
   
    if @item.save(context: :sell_step)
      @item_status = OrderStatus.create(status: 1, item_id: Item.all.last().id)
    else
      @item = Item.new(@params_item)
      render :sell
      respond_to do |format|
        format.json
      end
    end
  end

  def create
    items_params
    @item = Item.new(@params_item)
   
    if @item.save(context: :sell_step)
      @items_status = OrderStatus.create(status: 1, item_id: Item.all.last().id)
    else
      @item = Item.new(@params_item)
      render :sell
      respond_to do |format|
        format.json
      end
    end
  end

  def purchase
    
    # @item = Item.find(params[:item_id])
    @item = Item.find(1) #仮置き。実際は上の記述を使う
    
    Payjp.api_key = ENV['PAYJP_TEST_SECRET_KEY']
    begin
      Payjp::Charge.create(currency: 'jpy', amount: 100, card: params['payjp-token'])
    rescue
      redirect_to items_path
    end
    
    @item.update(buyer_id: 1, selled_at: "#{DateTime.now}", ) #buyer_idの値は仮置き

    @status = OrderStatus.find(1)
    
    @status.update(status: 3)
    redirect_to '/items/complete' #このパスは仮置き
  end

  def complete
  end


  private
  def items_params
    @params_categories = params.require(:item).require(:category_attributes).permit(:id)

    @params_brands = params.require(:item).require(:brand_attributes).permit(:name)
    @params_brands = @brands.find_by(name: @params_brands[:name])
    

    if @params_brands.present?
      @params_brands = @params_brands[:id]
    end

    @params_items = params.require(:item).permit(:name, :detail, :condition, :delivery_cost, :delivery_prefecture, :days_to_ship, :delivery_method, :price, item_images_attributes: [:image] ).merge(user_id: current_user.id, sales_condition: 0, category_id: @params_categories[:id], brand_id: @params_brands)
    params_int(@params_items)
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
