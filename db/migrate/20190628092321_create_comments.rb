class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :content ,null: false
      t.integer :user_id ,null: false ,foreign_key: true
      t.integer :item_id ,null: false ,foreign_key: true
      t.timestamps
    end
  end
end