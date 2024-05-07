export type SelectedType = {
    value: string,
    onSelectedSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void,
    setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>,
  }