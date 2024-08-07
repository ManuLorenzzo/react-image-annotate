import React, {
  useEffect,
  useReducer,
  forwardRef,
  useImperativeHandle,
} from "react"
import makeImmutable, { without } from "seamless-immutable"
import MainLayout from "../MainLayout"
import SettingsProvider from "../SettingsProvider"
import combineReducers from "./reducers/combine-reducers.js"
import generalReducer from "./reducers/general-reducer.js"
import getFromLocalStorage from "../utils/get-from-local-storage"
import historyHandler from "./reducers/history-handler.js"
import imageReducer from "./reducers/image-reducer.js"
import useEventCallback from "use-event-callback"
import videoReducer from "./reducers/video-reducer.js"
import defaultColors from "../colors.js"

/**
 * Annotator component
 * @param {Props} props
 * @param {React.Ref<any>} ref
 * @returns {Node}
 */
const Annotator = forwardRef(
  (
    {
      referenceImage,
      images,
      allowedArea,
      selectedImage = images && images.length > 0 ? 0 : undefined,
      showPointDistances,
      pointDistancePrecision,
      showTags = getFromLocalStorage("showTags", true),
      enabledTools = [
        "select",
        "create-point",
        "create-box",
        "create-polygon",
        "create-line",
        "create-expanding-line",
        "show-mask",
      ],
      selectedTool = "select",
      regionTagList = [],
      regionClsList = [],
      imageTagList = [],
      imageClsList = [],
      keyframes = {},
      taskDescription = "",
      fullImageSegmentationMode = false,
      RegionEditLabel,
      videoSrc,
      videoTime = 0,
      videoName,
      onExit,
      onNextImage,
      onPrevImage,
      keypointDefinitions,
      autoSegmentationOptions = { type: "autoseg" },
      hideHeader,
      hideHeaderText,
      hideNext,
      hidePrev,
      hideClone,
      hideSettings,
      hideFullScreen,
      hideSave,
      allowComments,
      classesThatMustBeUnique = [],
      colors = [],
    },
    ref
  ) => {
    if (typeof selectedImage === "string") {
      selectedImage = (images || []).findIndex(
        (img) => img.src === selectedImage
      )
      if (selectedImage === -1) selectedImage = undefined
    }
    const annotationType = images ? "image" : "video"
    const [state, dispatchToReducer] = useReducer(
      historyHandler(
        combineReducers(
          annotationType === "image" ? imageReducer : videoReducer,
          generalReducer
        )
      ),
      makeImmutable({
        annotationType,
        showTags,
        allowedArea,
        showPointDistances,
        pointDistancePrecision,
        selectedTool,
        fullImageSegmentationMode: fullImageSegmentationMode,
        autoSegmentationOptions,
        mode: null,
        taskDescription,
        showMask: true,
        labelImages: imageClsList.length > 0 || imageTagList.length > 0,
        regionClsList,
        regionTagList,
        imageClsList,
        imageTagList,
        currentVideoTime: videoTime,
        enabledTools,
        history: [],
        videoName,
        keypointDefinitions,
        allowComments,
        classesThatMustBeUnique,
        colors: colors?.length ? colors : defaultColors,
        ...(annotationType === "image"
          ? {
              selectedImage,
              images,
              selectedImageFrameTime:
                images && images.length > 0 ? images[0].frameTime : undefined,
            }
          : {
              videoSrc,
              keyframes,
            }),
      })
    )

    const dispatch = useEventCallback((action) => {
      if (action.type === "HEADER_BUTTON_CLICKED") {
        if (["Exit", "Done", "Save", "Complete"].includes(action.buttonName)) {
          return onExit(without(state, "history"))
        } else if (action.buttonName === "Next" && onNextImage) {
          return onNextImage(without(state, "history"))
        } else if (action.buttonName === "Prev" && onPrevImage) {
          return onPrevImage(without(state, "history"))
        }
      }
      dispatchToReducer(action)
    })

    const onRegionClassAdded = useEventCallback((cls) => {
      dispatchToReducer({
        type: "ON_CLS_ADDED",
        cls: cls,
      })
    })

    useEffect(() => {
      if (selectedImage === undefined) return
      dispatchToReducer({
        type: "SELECT_IMAGE",
        imageIndex: selectedImage,
        image: state.images[selectedImage],
      })
    }, [selectedImage, state.images])

    useImperativeHandle(ref, () => ({
      state,
      dispatch,
    }))

    if (!images && !videoSrc)
      return 'Missing required prop "images" or "videoSrc"'

    return (
      <SettingsProvider>
        <MainLayout
          referenceImage={referenceImage}
          RegionEditLabel={RegionEditLabel}
          alwaysShowNextButton={Boolean(onNextImage)}
          alwaysShowPrevButton={Boolean(onPrevImage)}
          state={state}
          dispatch={dispatch}
          onRegionClassAdded={onRegionClassAdded}
          classesThatMustBeUnique={classesThatMustBeUnique}
          hideHeader={hideHeader}
          hideHeaderText={hideHeaderText}
          hideNext={hideNext}
          hidePrev={hidePrev}
          hideClone={hideClone}
          hideSettings={hideSettings}
          hideFullScreen={hideFullScreen}
          hideSave={hideSave}
        />
      </SettingsProvider>
    )
  }
)

export default Annotator
