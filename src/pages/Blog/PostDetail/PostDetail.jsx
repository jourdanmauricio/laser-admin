import { useDispatch, useSelector } from 'react-redux';
import { handlePostEdit, onDeletePost } from '@/store/posts';
import { FaTrashAlt, FaArrowUp, FaArrowDown, FaEdit } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import { onChangeOrder } from '@/store/posts';

const PostDetail = ({ data }) => {
  const dispatch = useDispatch();
  let { posts } = useSelector((state) => state.posts);

  const handleClick = (data, action) => {
    const orderPost = Object.assign({}, data);
    const position =
      action === 'UP' ? orderPost.order + 1 : orderPost.order - 1;
    orderPost.order = position;

    dispatch(onChangeOrder({ editPost: orderPost, position: data.order }));
  };

  const onEditPost = (post) => {
    dispatch(handlePostEdit(post));
  };

  return (
    <>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => onEditPost(data)}
          className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
        >
          <FaEdit className="text-blue-500 text-xl" />
        </button>
        <button
          disabled={data.order === posts.length}
          onClick={() => handleClick(data, 'UP')}
          className="hover:bg-slate-200 p-2 rounded-full cursor-pointer text-teal-500 disabled:text-gray-300"
        >
          <FaArrowUp className=" text-xl" />
        </button>
        <button
          disabled={data.order === 1}
          onClick={() => handleClick(data, 'DOWN')}
          className="hover:bg-slate-200 p-2 rounded-full cursor-pointer text-teal-500 disabled:text-gray-300"
        >
          <FaArrowDown className="text-xl" />
        </button>
        <button
          onClick={() => dispatch(onDeletePost(data))}
          className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
        >
          <FaTrashAlt className="text-red-500 text-xl" />
        </button>
      </div>

      <div className="form__group w-full px-10">
        <label className="form__label">Slug</label>
        <input
          disabled
          className="form__input border-gray-500 w-full"
          name="resume"
          id="resume"
          cols="30"
          rows="2"
          value={data.slug}
        ></input>
      </div>

      {/* <div className="form__group w-full p-10">
        <label className="form__label">Resumen</label>
        <textarea
          disabled
          className="form__input border-gray-500 w-full"
          name="resume"
          id="resume"
          cols="30"
          rows="2"
          value={data.resume}
        ></textarea>
      </div> */}

      {/* <div className="form__group w-full">
        <label className="form__label">Contenido</label>

        <div className="ql-editor form__input border-gray-500 w-full">
          <div
            className="relative"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div> */}
    </>
  );
};

export default PostDetail;
