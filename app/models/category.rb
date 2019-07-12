class Category < ApplicationRecord
  has_many :items

  has_many :children, class_name: "Category", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Category", foreign_key: "parent_id", optional: true

  has_many :grandchildren, class_name: "Category", foreign_key: "grandparent_id"
  belongs_to :grandparent, class_name: "Category", foreign_key: "grandparent_id", optional: true
end
