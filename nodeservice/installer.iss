; -- PaymentAgent Inno Setup Script --

[Setup]
AppName=PaymentAgent
AppVersion=1.0
DefaultDirName={autopf}\PaymentAgent
DefaultGroupName=Payment Agent
UninstallDisplayIcon={app}\payment-agent.exe
OutputDir=output
OutputBaseFilename=PaymentAgentInstaller
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\payment-agent.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Start Payment Agent"; Filename: "{app}\payment-agent.exe"
Name: "{group}\Uninstall Payment Agent"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\payment-agent.exe"; Description: "Start Payment Agent now"; Flags: nowait postinstall skipifsilent

[Code]
// Optional: Add registry entry for auto-start at Windows boot
procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    RegWriteStringValue(HKEY_CURRENT_USER,
      'Software\Microsoft\Windows\CurrentVersion\Run',
      'PaymentAgent', ExpandConstant('{app}\payment-agent.exe'));
  end;
end;
