const TodoItem = ({item, onUpdate, onDelete}) => {
    const onChangeChk = () => {
        onUpdate(item.id)
    }
    const onDeleteBtn = () => {
        if (!window.confirm("삭제하시겠습니까?")) {
            return false
        }
        onDelete(item.id)
    }

    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input type="checkbox" name="chk[]" value={item.id} checked={item.isDone} onChange={onChangeChk}></input>
            </div>
            <div className="title_col">{item.content}</div>
            <div className="date_col">{new Date(item.createDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button type="button" onClick={onDeleteBtn}>삭제</button>
            </div>
        </div>
    )
}

export default TodoItem