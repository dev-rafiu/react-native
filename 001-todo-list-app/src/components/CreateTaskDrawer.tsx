import { useCallback, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
      <TouchableOpacity style={styles.fab} onPress={handlePresentModalPress}>
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={false}
        snapPoints={["80%"]}
      >
        <BottomSheetView style={styles.contentContainer}>
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

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },

  fab: {
    position: "absolute",
    bottom: 130,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#63D9F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    pointerEvents: "auto",
    zIndex: 1000,
  },

  bottomSheetOverlay: {
    // flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    // justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    minHeight: 400,
  },

  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },
});
