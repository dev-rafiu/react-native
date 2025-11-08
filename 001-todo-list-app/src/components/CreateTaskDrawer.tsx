import { useCallback, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import CreateTaskForm from "./TaskForm";

const CreateTaskDrawer = ({ onTaskCreated }: { onTaskCreated: () => void }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <TouchableOpacity
        className="absolute bottom-[130px] right-[30px] w-14 h-14 rounded-full bg-[#63D9F3] justify-center items-center shadow-lg z-[1000] pointer-events-auto"
        onPress={handlePresentModalPress}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={false}
        snapPoints={["80%"]}
      >
        <BottomSheetView className="flex-1 p-5">
          <CreateTaskForm
            onDismiss={handleDismissModal}
            onTaskCreated={onTaskCreated}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default CreateTaskDrawer;
