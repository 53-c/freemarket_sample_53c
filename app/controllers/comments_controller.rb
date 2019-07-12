class CommentsController < ApplicationController
  def create
    @comment = Comment.new(content: comment_params[:content], item_id: comment_params[:item_id], user_id: current_user.id)
    if @comment.save
      redirect_to item_path(comment_params[:item_id])
    else
      render :new
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content).merge(item_id: params[:item_id])
  end
end
