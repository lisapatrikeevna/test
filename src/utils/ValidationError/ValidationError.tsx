function ValidationError({ keyName, message }:any) {
  return (
    <>
      {keyName &&
        <p style={{ color: 'red', fontSize: "16px", paddingLeft: '1px'}}>
          {message}
        </p>
      }
    </>
  )
}

export default ValidationError;