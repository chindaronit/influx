import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import LoadComments from "./LoadComments";
import { useDispatch } from "react-redux";
import { addComment } from "../../../features/Comments/commentSlice";
import { useSelector } from "react-redux";

const Rating = ({ token, media_type, id, user, season, episode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [canComment, setCanComment] = useState(false);
  const [contentHeight, setContentHeight] = useState(2);
  const [comment, setComment] = useState("");
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    const c = e.target.value;
    if (c.length > 0) {
      setCanComment(true);
      setComment(c);
    } else {
      setCanComment(false);
      setComment("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setContentHeight(contentHeight + 1);
    } else if (e.key === "Backspace") {
      if (contentHeight > 2) {
        setContentHeight(contentHeight - 1);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentValue = comment.trim();
    try {
      const res = await dispatch(
        addComment({
          user,
          media_type,
          id,
          comment: commentValue,
          token,
          season,
          episode,
        })
      );
      setComment("");
      setContentHeight(2);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <form className="rating-container" onSubmit={handleSubmit} method="post">
      {comments?.length > 0 && (
        <div className="comment-count">{comments.length} Comments</div>
      )}

      <div className="post-comment">
        <div className="post-comment-area">
          <div className="rating-user-icon">
            <AccountCircleIcon />
          </div>
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={handleComment}
            onKeyDown={handleKeyDown}
            onClick={() => {
              setIsVisible(true);
            }}
            style={{
              height: contentHeight + "rem",
            }}
          />
        </div>

        <div className="comment-buttons">
          {isVisible && (
            <>
              {canComment ? (
                <div>
                  <Button
                    variant="contained"
                    type="submit"
                    className="comment-btn"
                  >
                    comment
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="contained" className="comment-btn" disabled>
                    comment
                  </Button>
                </div>
              )}

              <div>
                <Button
                  variant="contained"
                  className="cancel-btn"
                  onClick={() => {
                    setIsVisible(false);
                  }}
                >
                  cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <LoadComments comments={comments} />
    </form>
  );
};

export default Rating;
