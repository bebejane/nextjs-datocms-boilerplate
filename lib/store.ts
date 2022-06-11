import create from "zustand";

const useStore = create((set) => ({
	showMenu: true,
	setShowMenu: (show : boolean) =>  
    set((state) => ({
      showMenu: show
    })
  ),
}));

export default useStore;
