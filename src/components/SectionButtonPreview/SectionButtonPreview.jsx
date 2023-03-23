const SectionButtonPreview = ({ button, section }) => {
  if (Object.keys(button).length > 0) {
    document.documentElement.style.setProperty(
      '--sectionBgColor',
      `${section?.bgColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTextColor',
      `${button.textColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTextColorHover',
      `${button.textColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColor',
      `${button.bgColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorHover',
      `${button.bgColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTlRadius',
      `${button.tlRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTrRadius',
      `${button.trRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBlRadius',
      `${button.blRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBrRadius',
      `${button.brRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColor',
      `${button.borderColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorHover',
      `${button.borderColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnShadow',
      `${button.shadow.value}`
    );
    document.documentElement.style.setProperty(
      '--btnHeight',
      `${button.height.value}`
    );
    document.documentElement.style.setProperty(
      '--btnWidth',
      `${button.width.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorder',
      `${button.border.value}`
    );
  }
  return (
    <>
      {button && (
        <div className="border border-solid border-gray-300 bg-sectionBgColor h-20 w-full flex items-center justify-center">
          {button.show.value === 'true' && (
            <div
              type="button"
              className="border border-solid transition ease-in-out delay-100  hover:cursor-pointer btn__styles"
            >
              {button.text.value}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SectionButtonPreview;
