

export default function Menubar() {

  return (
    <>
      <div className="menubar">
        <ol>
          <li>First button</li>
          <li>Second button</li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l3.39-1.71 3.389 1.71c.386.198.824-.149.746-.592l-.646-3.766 2.72-2.654c.329-.321.158-.888-.283-.95l-3.78-.55L8.465.792c-.197-.399-.73-.399-.927 0L5.354 5.53l-3.78.55c-.441.062-.612.629-.283.95l2.72 2.654-.646 3.766z" />
            </svg>
          </li>
          <li>Button Four</li>
          <li>Button Five</li>
        </ol>
      </div>
    </>
  )
}
