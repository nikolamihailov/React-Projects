type LogoProps = {
  width: number;
  src: string;
};
function Logo({ width, src }: LogoProps) {
  return (
    <>
      <img src={src} alt="logo for sipspot bar" width={width} />
    </>
  );
}

export default Logo;
