window.COMMANDS_DATA = {
    commands: [
      // =========================
      // VOLUME
      // =========================
      { id: "vol-show", name: "volume show", description: "Display volumes", example: "volume show -fields name,size,state,space-used", category: "vol", tag: "Volume" },
      { id: "vol-create", name: "volume create", description: "Create a new FlexVol", example: "volume create -vserver svm0 -volume vol1 -aggregate aggr1 -size 10g", category: "vol", tag: "Volume" },
      { id: "vol-delete", name: "volume delete", description: "Delete a volume", example: "volume delete -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-online", name: "volume online", description: "Bring a volume online", example: "volume online -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-offline", name: "volume offline", description: "Take a volume offline", example: "volume offline -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-modify", name: "volume modify", description: "Modify volume properties", example: "volume modify -vserver svm0 -volume vol1 -percent-snapshot-space 10", category: "vol", tag: "Volume" },
      { id: "vol-size", name: "volume size", description: "Resize a volume", example: "volume size -vserver svm0 -volume vol1 -new-size +5g", category: "vol", tag: "Volume" },
      { id: "vol-mount", name: "volume mount", description: "Mount a volume to namespace", example: "volume mount -vserver svm0 -volume vol1 -junction-path /vol1", category: "vol", tag: "Volume" },
      { id: "vol-unmount", name: "volume unmount", description: "Unmount a volume", example: "volume unmount -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-move-start", name: "volume move start", description: "Start a volume move", example: "volume move start -vserver svm0 -volume vol1 -destination-aggregate aggr2", category: "vol", tag: "Volume" },
      { id: "vol-move-show", name: "volume move show", description: "Show volume move status", example: "volume move show -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-move-trigger-cutover", name: "volume move trigger-cutover", description: "Trigger cutover for a moving volume", example: "volume move trigger-cutover -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-clone-create", name: "volume clone create", description: "Create a FlexClone volume", example: "volume clone create -vserver svm0 -flexclone clone1 -parent-volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-clone-show", name: "volume clone show", description: "Show clone volumes", example: "volume clone show -vserver svm0", category: "vol", tag: "Volume" },
      { id: "vol-clone-split-start", name: "volume clone split start", description: "Start clone split", example: "volume clone split start -vserver svm0 -flexclone clone1", category: "vol", tag: "Volume" },
      { id: "vol-clone-split-show", name: "volume clone split show", description: "Show clone split status", example: "volume clone split show -vserver svm0", category: "vol", tag: "Volume" },
      { id: "vol-autosize-show", name: "volume autosize show", description: "Show autosize settings", example: "volume autosize show -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-autosize-modify", name: "volume autosize modify", description: "Modify autosize settings", example: "volume autosize modify -vserver svm0 -volume vol1 -mode grow", category: "vol", tag: "Volume" },
      { id: "vol-file-show-disk-usage", name: "volume file show-disk-usage", description: "Show large files and disk usage", example: "volume file show-disk-usage -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-qtree-show", name: "volume qtree show", description: "Show qtrees", example: "volume qtree show -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-qtree-create", name: "volume qtree create", description: "Create a qtree", example: "volume qtree create -vserver svm0 -volume vol1 -qtree qt1", category: "vol", tag: "Volume" },
      { id: "vol-qtree-delete", name: "volume qtree delete", description: "Delete a qtree", example: "volume qtree delete -vserver svm0 -volume vol1 -qtree qt1", category: "vol", tag: "Volume" },
      { id: "vol-qtree-modify", name: "volume qtree modify", description: "Modify qtree properties", example: "volume qtree modify -vserver svm0 -volume vol1 -qtree qt1 -security-style unix", category: "vol", tag: "Volume" },
      { id: "vol-rehost", name: "volume rehost", description: "Rehost a volume to another SVM", example: "volume rehost -vserver svm0 -volume vol1 -destination-vserver svm1", category: "vol", tag: "Volume" },
      { id: "vol-show-footprint", name: "volume show-footprint", description: "Show volume footprint on aggregate", example: "volume show-footprint -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-show-space", name: "volume show-space", description: "Show volume space usage", example: "volume show-space -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
      { id: "vol-language-show", name: "volume language show", description: "Show volume language settings", example: "volume language show -vserver svm0", category: "vol", tag: "Volume" },
      { id: "vol-encryption-conversion-show", name: "volume encryption conversion show", description: "Show volume encryption conversion status", example: "volume encryption conversion show -vserver svm0 -volume vol1", category: "vol", tag: "Volume" },
  
      // =========================
      // SNAPSHOT
      // =========================
      { id: "snap-show", name: "volume snapshot show", description: "List snapshots", example: "volume snapshot show -vserver svm0 -volume vol1", category: "snap", tag: "Snapshot" },
      { id: "snap-create", name: "volume snapshot create", description: "Create a snapshot", example: "volume snapshot create -vserver svm0 -volume vol1 -snapshot snap1", category: "snap", tag: "Snapshot" },
      { id: "snap-delete", name: "volume snapshot delete", description: "Delete a snapshot", example: "volume snapshot delete -vserver svm0 -volume vol1 -snapshot snap1", category: "snap", tag: "Snapshot" },
      { id: "snap-rename", name: "volume snapshot rename", description: "Rename a snapshot", example: "volume snapshot rename -vserver svm0 -volume vol1 -snapshot snap1 -new-name snap2", category: "snap", tag: "Snapshot" },
      { id: "snap-restore", name: "volume snapshot restore", description: "Restore a volume from snapshot", example: "volume snapshot restore -vserver svm0 -volume vol1 -snapshot snap1", category: "snap", tag: "Snapshot" },
      { id: "snap-restore-file", name: "volume snapshot restore-file", description: "Restore file from snapshot", example: "volume snapshot restore-file -vserver svm0 -volume vol1 -snapshot snap1 -path /file.txt", category: "snap", tag: "Snapshot" },
      { id: "snap-policy-show", name: "volume snapshot policy show", description: "Show snapshot policies", example: "volume snapshot policy show -vserver svm0", category: "snap", tag: "Snapshot" },
      { id: "snap-policy-create", name: "volume snapshot policy create", description: "Create snapshot policy", example: "volume snapshot policy create -vserver svm0 -policy daily_snap", category: "snap", tag: "Snapshot" },
      { id: "snap-policy-modify", name: "volume snapshot policy modify", description: "Modify snapshot policy", example: "volume snapshot policy modify -vserver svm0 -policy daily_snap -enabled true", category: "snap", tag: "Snapshot" },
      { id: "snap-policy-delete", name: "volume snapshot policy delete", description: "Delete snapshot policy", example: "volume snapshot policy delete -vserver svm0 -policy daily_snap", category: "snap", tag: "Snapshot" },
      { id: "snap-autodelete-show", name: "volume snapshot autodelete show", description: "Show snapshot autodelete settings", example: "volume snapshot autodelete show -vserver svm0 -volume vol1", category: "snap", tag: "Snapshot" },
      { id: "snap-autodelete-modify", name: "volume snapshot autodelete modify", description: "Modify snapshot autodelete settings", example: "volume snapshot autodelete modify -vserver svm0 -volume vol1 -enabled true", category: "snap", tag: "Snapshot" },
  
      // =========================
      // SNAPMIRROR / REPLICATION
      // =========================
      { id: "sm-show", name: "snapmirror show", description: "Show SnapMirror status", example: "snapmirror show -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-create", name: "snapmirror create", description: "Create SnapMirror relationship", example: "snapmirror create -source-path svm_src:vol_src -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-initialize", name: "snapmirror initialize", description: "Initialize SnapMirror relationship", example: "snapmirror initialize -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-resync", name: "snapmirror resync", description: "Resync SnapMirror relationship", example: "snapmirror resync -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-update", name: "snapmirror update", description: "Update SnapMirror manually", example: "snapmirror update -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-break", name: "snapmirror break", description: "Break SnapMirror relationship", example: "snapmirror break -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-delete", name: "snapmirror delete", description: "Delete SnapMirror relationship", example: "snapmirror delete -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-release", name: "snapmirror release", description: "Release source-side SnapMirror metadata", example: "snapmirror release -relationship-info-only true -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-quiesce", name: "snapmirror quiesce", description: "Quiesce SnapMirror transfers", example: "snapmirror quiesce -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-resume", name: "snapmirror resume", description: "Resume a quiesced relationship", example: "snapmirror resume -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-abort", name: "snapmirror abort", description: "Abort active SnapMirror transfer", example: "snapmirror abort -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-policy-show", name: "snapmirror policy show", description: "Show SnapMirror policies", example: "snapmirror policy show", category: "rep", tag: "SnapMirror" },
      { id: "sm-policy-create", name: "snapmirror policy create", description: "Create SnapMirror policy", example: "snapmirror policy create -vserver svm_dst -policy async_policy -type async-mirror", category: "rep", tag: "SnapMirror" },
      { id: "sm-policy-add-rule", name: "snapmirror policy add-rule", description: "Add rule to SnapMirror policy", example: "snapmirror policy add-rule -vserver svm_dst -policy async_policy -snapmirror-label daily", category: "rep", tag: "SnapMirror" },
      { id: "sm-history-show", name: "snapmirror show-history", description: "Show SnapMirror history", example: "snapmirror show-history -destination-path svm_dst:vol_dst", category: "rep", tag: "SnapMirror" },
      { id: "sm-capability-show", name: "snapmirror capability show", description: "Show relationship capabilities", example: "snapmirror capability show", category: "rep", tag: "SnapMirror" },
  
      // =========================
      // NETWORK
      // =========================
      { id: "net-port-show", name: "network port show", description: "Show network ports", example: "network port show -fields port,link,speed,health-status", category: "net", tag: "Network" },
      { id: "net-port-modify", name: "network port modify", description: "Modify network port settings", example: "network port modify -node node1 -port e0c -mtu 9000", category: "net", tag: "Network" },
      { id: "net-port-reachability-show", name: "network port reachability show", description: "Show port reachability status", example: "network port reachability show", category: "net", tag: "Network" },
      { id: "net-port-reachability-repair", name: "network port reachability repair", description: "Repair port reachability", example: "network port reachability repair -node node1 -port e0c", category: "net", tag: "Network" },
      { id: "net-port-broadcast-domain-show", name: "network port broadcast-domain show", description: "Show broadcast domains", example: "network port broadcast-domain show", category: "net", tag: "Network" },
      { id: "net-port-broadcast-domain-create", name: "network port broadcast-domain create", description: "Create broadcast domain", example: "network port broadcast-domain create -broadcast-domain Default -ipspace Default", category: "net", tag: "Network" },
      { id: "net-port-broadcast-domain-add-ports", name: "network port broadcast-domain add-ports", description: "Add ports to broadcast domain", example: "network port broadcast-domain add-ports -broadcast-domain Default -ports node1:e0c,node2:e0c", category: "net", tag: "Network" },
      { id: "net-route-show", name: "network route show", description: "Show routes", example: "network route show -vserver svm0", category: "net", tag: "Network" },
      { id: "net-route-create", name: "network route create", description: "Create route", example: "network route create -vserver svm0 -destination 0.0.0.0/0 -gateway 10.0.0.1", category: "net", tag: "Network" },
      { id: "net-int-show", name: "network interface show", description: "Show LIFs", example: "network interface show -fields vserver,lif,address,status-admin,status-oper", category: "net", tag: "Network" },
      { id: "net-int-create", name: "network interface create", description: "Create LIF", example: "network interface create -vserver svm0 -lif lif1 -home-node node1 -home-port e0c -address 10.0.0.10 -netmask 255.255.255.0", category: "net", tag: "Network" },
      { id: "net-int-modify", name: "network interface modify", description: "Modify LIF settings", example: "network interface modify -vserver svm0 -lif lif1 -status-admin down", category: "net", tag: "Network" },
      { id: "net-int-delete", name: "network interface delete", description: "Delete LIF", example: "network interface delete -vserver svm0 -lif lif1", category: "net", tag: "Network" },
      { id: "net-int-migrate", name: "network interface migrate", description: "Migrate LIF to another port", example: "network interface migrate -vserver svm0 -lif lif1 -destination-node node2 -destination-port e0d", category: "net", tag: "Network" },
      { id: "net-int-revert", name: "network interface revert", description: "Revert LIF to home port", example: "network interface revert -vserver svm0 -lif lif1", category: "net", tag: "Network" },
      { id: "net-int-failover-groups-show", name: "network interface failover-groups show", description: "Show failover groups", example: "network interface failover-groups show", category: "net", tag: "Network" },
      { id: "net-int-failover-groups-create", name: "network interface failover-groups create", description: "Create failover group", example: "network interface failover-groups create -vserver svm0 -failover-group fg1 -targets node1:e0c,node2:e0c", category: "net", tag: "Network" },
      { id: "net-ipspace-show", name: "network ipspace show", description: "Show IPspaces", example: "network ipspace show", category: "net", tag: "Network" },
      { id: "net-ipspace-create", name: "network ipspace create", description: "Create IPspace", example: "network ipspace create -ipspace tenant1", category: "net", tag: "Network" },
      { id: "net-port-vlan-create", name: "network port vlan create", description: "Create VLAN interface", example: "network port vlan create -node node1 -vlan-name e0c-100", category: "net", tag: "Network" },
      { id: "net-port-vlan-delete", name: "network port vlan delete", description: "Delete VLAN interface", example: "network port vlan delete -node node1 -vlan-name e0c-100", category: "net", tag: "Network" },
      { id: "net-port-ifgrp-show", name: "network port ifgrp show", description: "Show interface groups", example: "network port ifgrp show", category: "net", tag: "Network" },
      { id: "net-port-ifgrp-create", name: "network port ifgrp create", description: "Create interface group", example: "network port ifgrp create -node node1 -ifgrp a0a -distribution-function ip", category: "net", tag: "Network" },
      { id: "net-port-ifgrp-add-port", name: "network port ifgrp add-port", description: "Add port to interface group", example: "network port ifgrp add-port -node node1 -ifgrp a0a -port e0c", category: "net", tag: "Network" },
      { id: "dns-show", name: "vserver services dns show", description: "Show DNS configuration", example: "vserver services dns show -vserver svm0", category: "net", tag: "Network" },
      { id: "dns-create", name: "vserver services dns create", description: "Create DNS config", example: "vserver services dns create -vserver svm0 -domains example.com -name-servers 10.0.0.53", category: "net", tag: "Network" },
      { id: "dns-modify", name: "vserver services dns modify", description: "Modify DNS config", example: "vserver services dns modify -vserver svm0 -timeout 2", category: "net", tag: "Network" },
  
      // =========================
      // SVM
      // =========================
      { id: "svm-show", name: "vserver show", description: "Show all SVMs", example: "vserver show -fields vserver,state,subtype,root-volume", category: "svm", tag: "SVM" },
      { id: "svm-create", name: "vserver create", description: "Create new SVM", example: "vserver create -vserver svm1 -rootvolume root_svm1 -aggregate aggr1", category: "svm", tag: "SVM" },
      { id: "svm-modify", name: "vserver modify", description: "Modify SVM properties", example: "vserver modify -vserver svm1 -language C.UTF-8", category: "svm", tag: "SVM" },
      { id: "svm-delete", name: "vserver delete", description: "Delete SVM", example: "vserver delete -vserver svm1", category: "svm", tag: "SVM" },
      { id: "svm-rename", name: "vserver rename", description: "Rename SVM", example: "vserver rename -vserver svm1 -newname svm_prod", category: "svm", tag: "SVM" },
      { id: "svm-peer-show", name: "vserver peer show", description: "Show SVM peer relationships", example: "vserver peer show", category: "svm", tag: "SVM" },
      { id: "svm-peer-create", name: "vserver peer create", description: "Create SVM peer relationship", example: "vserver peer create -vserver svm_src -peer-vserver svm_dst -applications snapmirror", category: "svm", tag: "SVM" },
      { id: "svm-peer-accept", name: "vserver peer accept", description: "Accept SVM peer relationship", example: "vserver peer accept -vserver svm_dst -peer-vserver svm_src", category: "svm", tag: "SVM" },
      { id: "svm-peer-delete", name: "vserver peer delete", description: "Delete SVM peer relationship", example: "vserver peer delete -vserver svm_src -peer-vserver svm_dst", category: "svm", tag: "SVM" },
      { id: "svm-services-name-service-cache-show", name: "vserver services name-service cache show", description: "Show name service cache", example: "vserver services name-service cache show -vserver svm0", category: "svm", tag: "SVM" },
  
      // =========================
      // EXPORT / NFS
      // =========================
      { id: "export-policy-show", name: "vserver export-policy show", description: "Show export policies", example: "vserver export-policy show -vserver svm0", category: "export", tag: "Export Policy" },
      { id: "export-policy-create", name: "vserver export-policy create", description: "Create export policy", example: "vserver export-policy create -vserver svm0 -policyname default_policy", category: "export", tag: "Export Policy" },
      { id: "export-policy-delete", name: "vserver export-policy delete", description: "Delete export policy", example: "vserver export-policy delete -vserver svm0 -policyname default_policy", category: "export", tag: "Export Policy" },
      { id: "export-rule-show", name: "vserver export-policy rule show", description: "Show export rules", example: "vserver export-policy rule show -vserver svm0 -policyname default_policy", category: "export", tag: "Export Policy" },
      { id: "export-rule-create", name: "vserver export-policy rule create", description: "Create export rule", example: "vserver export-policy rule create -vserver svm0 -policyname default_policy -clientmatch 10.0.0.0/24 -rorule sys", category: "export", tag: "Export Policy" },
      { id: "export-rule-modify", name: "vserver export-policy rule modify", description: "Modify export rule", example: "vserver export-policy rule modify -vserver svm0 -policyname default_policy -ruleindex 1 -rwrule sys", category: "export", tag: "Export Policy" },
      { id: "export-rule-delete", name: "vserver export-policy rule delete", description: "Delete export rule", example: "vserver export-policy rule delete -vserver svm0 -policyname default_policy -ruleindex 1", category: "export", tag: "Export Policy" },
      { id: "nfs-show", name: "vserver nfs show", description: "Show NFS configuration", example: "vserver nfs show -vserver svm0", category: "nfs", tag: "NFS" },
      { id: "nfs-create", name: "vserver nfs create", description: "Enable NFS service", example: "vserver nfs create -vserver svm0", category: "nfs", tag: "NFS" },
      { id: "nfs-modify", name: "vserver nfs modify", description: "Modify NFS service settings", example: "vserver nfs modify -vserver svm0 -v4.1 enabled", category: "nfs", tag: "NFS" },
      { id: "nfs-status", name: "vserver nfs status", description: "Check NFS service status", example: "vserver nfs status -vserver svm0", category: "nfs", tag: "NFS" },
  
      // =========================
      // CIFS / SMB
      // =========================
      { id: "cifs-show", name: "vserver cifs show", description: "Show CIFS server configuration", example: "vserver cifs show -vserver svm0", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-create", name: "vserver cifs create", description: "Create CIFS server", example: "vserver cifs create -vserver svm0 -cifs-server CIFS1 -domain example.com", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-delete", name: "vserver cifs delete", description: "Delete CIFS server", example: "vserver cifs delete -vserver svm0", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-options-show", name: "vserver cifs options show", description: "Show CIFS options", example: "vserver cifs options show -vserver svm0", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-options-modify", name: "vserver cifs options modify", description: "Modify CIFS options", example: "vserver cifs options modify -vserver svm0 -is-multichannel-enabled true", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-share-show", name: "vserver cifs share show", description: "Show CIFS shares", example: "vserver cifs share show -vserver svm0", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-share-create", name: "vserver cifs share create", description: "Create CIFS share", example: "vserver cifs share create -vserver svm0 -share-name data -path /data", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-share-delete", name: "vserver cifs share delete", description: "Delete CIFS share", example: "vserver cifs share delete -vserver svm0 -share-name data", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-session-show", name: "vserver cifs session show", description: "Show CIFS sessions", example: "vserver cifs session show -vserver svm0", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-session-close", name: "vserver cifs session close", description: "Close CIFS session", example: "vserver cifs session close -vserver svm0 -session-id 12345", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-share-access-control-show", name: "vserver cifs share access-control show", description: "Show CIFS share ACLs", example: "vserver cifs share access-control show -vserver svm0 -share data", category: "cifs", tag: "CIFS/SMB" },
      { id: "cifs-share-access-control-create", name: "vserver cifs share access-control create", description: "Create CIFS share ACL", example: "vserver cifs share access-control create -vserver svm0 -share data -user-or-group DOMAIN\\Admins -permission full_control", category: "cifs", tag: "CIFS/SMB" },
  
      // =========================
      // SAN / LUN / IGROUP
      // =========================
      { id: "lun-show", name: "lun show", description: "Show LUNs", example: "lun show -vserver svm0", category: "san", tag: "SAN/LUN" },
      { id: "lun-create", name: "lun create", description: "Create a LUN", example: "lun create -vserver svm0 -path /vol/vol1/lun1 -size 100g -ostype linux", category: "san", tag: "SAN/LUN" },
      { id: "lun-delete", name: "lun delete", description: "Delete a LUN", example: "lun delete -vserver svm0 -path /vol/vol1/lun1", category: "san", tag: "SAN/LUN" },
      { id: "lun-map", name: "lun map", description: "Map LUN to igroup", example: "lun map -vserver svm0 -path /vol/vol1/lun1 -igroup ig1", category: "san", tag: "SAN/LUN" },
      { id: "lun-unmap", name: "lun unmap", description: "Unmap LUN from igroup", example: "lun unmap -vserver svm0 -path /vol/vol1/lun1 -igroup ig1", category: "san", tag: "SAN/LUN" },
      { id: "lun-modify", name: "lun modify", description: "Modify LUN properties", example: "lun modify -vserver svm0 -path /vol/vol1/lun1 -space-reserve enabled", category: "san", tag: "SAN/LUN" },
      { id: "lun-mapping-show", name: "lun mapping show", description: "Show LUN mappings", example: "lun mapping show -vserver svm0", category: "san", tag: "SAN/LUN" },
      { id: "igroup-show", name: "igroup show", description: "Show igroups", example: "igroup show -vserver svm0", category: "san", tag: "SAN/LUN" },
      { id: "igroup-create", name: "igroup create", description: "Create igroup", example: "igroup create -vserver svm0 -igroup ig1 -protocol fcp -ostype linux", category: "san", tag: "SAN/LUN" },
      { id: "igroup-delete", name: "igroup delete", description: "Delete igroup", example: "igroup delete -vserver svm0 -igroup ig1", category: "san", tag: "SAN/LUN" },
      { id: "igroup-add", name: "igroup add", description: "Add initiator to igroup", example: "igroup add -vserver svm0 -igroup ig1 -initiator 10:00:00:00:00:00:00:01", category: "san", tag: "SAN/LUN" },
      { id: "igroup-remove", name: "igroup remove", description: "Remove initiator from igroup", example: "igroup remove -vserver svm0 -igroup ig1 -initiator 10:00:00:00:00:00:00:01", category: "san", tag: "SAN/LUN" },
      { id: "fcp-adapter-show", name: "fcp adapter show", description: "Show FCP adapters", example: "fcp adapter show", category: "san", tag: "SAN/LUN" },
      { id: "fcp-initiator-show", name: "fcp initiator show", description: "Show logged-in FC initiators", example: "fcp initiator show", category: "san", tag: "SAN/LUN" },
      { id: "iscsi-show", name: "vserver iscsi show", description: "Show iSCSI configuration", example: "vserver iscsi show -vserver svm0", category: "san", tag: "SAN/LUN" },
      { id: "iscsi-create", name: "vserver iscsi create", description: "Enable iSCSI service", example: "vserver iscsi create -vserver svm0", category: "san", tag: "SAN/LUN" },
      { id: "iscsi-status", name: "vserver iscsi status", description: "Show iSCSI service status", example: "vserver iscsi status -vserver svm0", category: "san", tag: "SAN/LUN" },
  
      // =========================
      // AGGREGATE / STORAGE
      // =========================
      { id: "aggr-show", name: "storage aggregate show", description: "Show aggregates", example: "storage aggregate show -fields aggregate,state,size,used", category: "aggr", tag: "Aggregate" },
      { id: "aggr-create", name: "storage aggregate create", description: "Create aggregate", example: "storage aggregate create -aggregate aggr_data -node node1 -diskcount 10", category: "aggr", tag: "Aggregate" },
      { id: "aggr-delete", name: "storage aggregate delete", description: "Delete aggregate", example: "storage aggregate delete -aggregate aggr_old", category: "aggr", tag: "Aggregate" },
      { id: "aggr-add-disks", name: "storage aggregate add-disks", description: "Add disks to aggregate", example: "storage aggregate add-disks -aggregate aggr1 -diskcount 4", category: "aggr", tag: "Aggregate" },
      { id: "aggr-offline", name: "storage aggregate offline", description: "Offline aggregate", example: "storage aggregate offline -aggregate aggr1", category: "aggr", tag: "Aggregate" },
      { id: "aggr-online", name: "storage aggregate online", description: "Bring aggregate online", example: "storage aggregate online -aggregate aggr1", category: "aggr", tag: "Aggregate" },
      { id: "aggr-rename", name: "storage aggregate rename", description: "Rename aggregate", example: "storage aggregate rename -aggregate aggr1 -newname aggr_data", category: "aggr", tag: "Aggregate" },
      { id: "aggr-reallocate-start", name: "storage aggregate reallocate start", description: "Start aggregate reallocation", example: "storage aggregate reallocate start -aggregate aggr1", category: "aggr", tag: "Aggregate" },
      { id: "aggr-reallocate-show", name: "storage aggregate reallocate show", description: "Show aggregate reallocation status", example: "storage aggregate reallocate show", category: "aggr", tag: "Aggregate" },
      { id: "disk-show", name: "storage disk show", description: "Show disks", example: "storage disk show -fields disk,container-type,owner,used", category: "aggr", tag: "Aggregate" },
      { id: "disk-assign", name: "storage disk assign", description: "Assign disk to node", example: "storage disk assign -disk 1.0.1 -owner node1", category: "aggr", tag: "Aggregate" },
      { id: "disk-removeowner", name: "storage disk removeowner", description: "Remove disk ownership", example: "storage disk removeowner -disk 1.0.1", category: "aggr", tag: "Aggregate" },
      { id: "disk-zerospares", name: "storage disk zerospares", description: "Zero spare disks", example: "storage disk zerospares", category: "aggr", tag: "Aggregate" },
      { id: "disk-option-show", name: "storage disk option show", description: "Show disk options", example: "storage disk option show", category: "aggr", tag: "Aggregate" },
      { id: "raidgroup-show", name: "storage aggregate show-status", description: "Show aggregate RAID group status", example: "storage aggregate show-status -aggregate aggr1", category: "aggr", tag: "Aggregate" },
  
      // =========================
      // CLUSTER / NODE / SYSTEM
      // =========================
      { id: "cluster-show", name: "cluster show", description: "Show cluster information", example: "cluster show", category: "sys", tag: "System" },
      { id: "cluster-identity-show", name: "cluster identity show", description: "Show cluster identity", example: "cluster identity show", category: "sys", tag: "System" },
      { id: "cluster-peer-show", name: "cluster peer show", description: "Show cluster peers", example: "cluster peer show", category: "sys", tag: "System" },
      { id: "cluster-peer-create", name: "cluster peer create", description: "Create cluster peering", example: "cluster peer create -peer-addrs 10.0.0.2", category: "sys", tag: "System" },
      { id: "cluster-peer-delete", name: "cluster peer delete", description: "Delete cluster peering", example: "cluster peer delete -cluster peercluster", category: "sys", tag: "System" },
      { id: "node-show", name: "system node show", description: "Show cluster nodes", example: "system node show -fields node,health,model,version", category: "sys", tag: "System" },
      { id: "node-run", name: "system node run", description: "Run a nodeshell command", example: "system node run -node node1", category: "sys", tag: "System" },
      { id: "node-autosupport-show", name: "system node autosupport show", description: "Show AutoSupport settings", example: "system node autosupport show", category: "sys", tag: "System" },
      { id: "node-autosupport-modify", name: "system node autosupport modify", description: "Modify AutoSupport settings", example: "system node autosupport modify -node node1 -state enable", category: "sys", tag: "System" },
      { id: "license-show", name: "system license show", description: "Show installed licenses", example: "system license show", category: "sys", tag: "System" },
      { id: "feature-status-show", name: "system feature-status show", description: "Show feature status", example: "system feature-status show", category: "sys", tag: "System" },
      { id: "service-processor-show", name: "system service-processor show", description: "Show service processor status", example: "system service-processor show", category: "sys", tag: "System" },
      { id: "timezone-show", name: "cluster date show", description: "Show cluster date and timezone", example: "cluster date show", category: "sys", tag: "System" },
      { id: "job-show", name: "job show", description: "Show active jobs", example: "job show", category: "sys", tag: "System" },
      { id: "job-history-show", name: "job history show", description: "Show job history", example: "job history show", category: "sys", tag: "System" },
  
      // =========================
      // HEALTH / EVENT / DIAGNOSTICS
      // =========================
      { id: "health-status-show", name: "system health status show", description: "Show overall health status", example: "system health status show", category: "diag", tag: "Diagnostics" },
      { id: "health-alert-show", name: "system health alert show", description: "Show health alerts", example: "system health alert show", category: "diag", tag: "Diagnostics" },
      { id: "event-log-show", name: "event log show", description: "Show event logs", example: "event log show -time >1h", category: "diag", tag: "Diagnostics" },
      { id: "event-route-show", name: "event route show", description: "Show EMS event routes", example: "event route show", category: "diag", tag: "Diagnostics" },
      { id: "ems-filter-show", name: "event filter show", description: "Show EMS filters", example: "event filter show", category: "diag", tag: "Diagnostics" },
      { id: "cluster-ring-show", name: "cluster ring show", description: "Show cluster ring status", example: "cluster ring show", category: "diag", tag: "Diagnostics" },
      { id: "system-configuration-recovery-cluster-show", name: "system configuration recovery cluster show", description: "Show cluster configuration recovery info", example: "system configuration recovery cluster show", category: "diag", tag: "Diagnostics" },
  
      // =========================
      // SECURITY / AUTH
      // =========================
      { id: "sec-login-show", name: "security login show", description: "Show local login accounts", example: "security login show", category: "sec", tag: "Security" },
      { id: "sec-login-create", name: "security login create", description: "Create login account", example: "security login create -username admin2 -application ssh -authmethod password -role admin", category: "sec", tag: "Security" },
      { id: "sec-login-delete", name: "security login delete", description: "Delete login account", example: "security login delete -username admin2 -application ssh -authmethod password", category: "sec", tag: "Security" },
      { id: "sec-login-role-show", name: "security login role show", description: "Show login roles", example: "security login role show", category: "sec", tag: "Security" },
      { id: "sec-login-role-create", name: "security login role create", description: "Create custom role", example: "security login role create -role customadmin -cmddirname volume", category: "sec", tag: "Security" },
      { id: "sec-cert-show", name: "security certificate show", description: "Show certificates", example: "security certificate show -vserver svm0", category: "sec", tag: "Security" },
      { id: "sec-cert-install", name: "security certificate install", description: "Install certificate", example: "security certificate install -vserver svm0 -type server", category: "sec", tag: "Security" },
      { id: "sec-cert-delete", name: "security certificate delete", description: "Delete certificate", example: "security certificate delete -vserver svm0 -common-name cert1", category: "sec", tag: "Security" },
      { id: "sec-audit-log-show", name: "security audit log show", description: "Show security audit logs", example: "security audit log show", category: "sec", tag: "Security" },
      { id: "sec-key-manager-show", name: "security key-manager show", description: "Show onboard key manager status", example: "security key-manager show", category: "sec", tag: "Security" },
      { id: "sec-key-manager-setup", name: "security key-manager setup", description: "Set up onboard key manager", example: "security key-manager setup", category: "sec", tag: "Security" },
  
      // =========================
      // EFFICIENCY / DEDUPE / COMPRESSION
      // =========================
      { id: "eff-show", name: "volume efficiency show", description: "Show efficiency status", example: "volume efficiency show -vserver svm0 -volume vol1", category: "eff", tag: "Efficiency" },
      { id: "eff-start", name: "volume efficiency start", description: "Start efficiency operation", example: "volume efficiency start -vserver svm0 -volume vol1", category: "eff", tag: "Efficiency" },
      { id: "eff-stop", name: "volume efficiency stop", description: "Stop efficiency operation", example: "volume efficiency stop -vserver svm0 -volume vol1", category: "eff", tag: "Efficiency" },
      { id: "eff-modify", name: "volume efficiency modify", description: "Modify efficiency settings", example: "volume efficiency modify -vserver svm0 -volume vol1 -schedule auto", category: "eff", tag: "Efficiency" },
      { id: "eff-policy-show", name: "volume efficiency policy show", description: "Show efficiency policies", example: "volume efficiency policy show -vserver svm0", category: "eff", tag: "Efficiency" },
      { id: "eff-policy-create", name: "volume efficiency policy create", description: "Create efficiency policy", example: "volume efficiency policy create -vserver svm0 -policy policy1 -type threshold", category: "eff", tag: "Efficiency" },
  
      // =========================
      // QUOTAS
      // =========================
      { id: "quota-show", name: "volume quota show", description: "Show quota configuration", example: "volume quota show -vserver svm0", category: "quota", tag: "Quota" },
      { id: "quota-policy-show", name: "volume quota policy show", description: "Show quota policies", example: "volume quota policy show -vserver svm0", category: "quota", tag: "Quota" },
      { id: "quota-policy-rule-show", name: "volume quota policy rule show", description: "Show quota rules", example: "volume quota policy rule show -vserver svm0 -policy default", category: "quota", tag: "Quota" },
      { id: "quota-policy-rule-create", name: "volume quota policy rule create", description: "Create quota rule", example: "volume quota policy rule create -vserver svm0 -policy default -volume vol1 -type tree -target '' -disk-limit 100g", category: "quota", tag: "Quota" },
      { id: "quota-on", name: "volume quota on", description: "Enable quotas on a volume", example: "volume quota on -vserver svm0 -volume vol1", category: "quota", tag: "Quota" },
      { id: "quota-off", name: "volume quota off", description: "Disable quotas on a volume", example: "volume quota off -vserver svm0 -volume vol1", category: "quota", tag: "Quota" },
      { id: "quota-resize", name: "volume quota resize", description: "Resize quotas after rule changes", example: "volume quota resize -vserver svm0 -volume vol1", category: "quota", tag: "Quota" },
      { id: "quota-report", name: "volume quota report", description: "Show quota usage report", example: "volume quota report -vserver svm0 -volume vol1", category: "quota", tag: "Quota" },
  
      // =========================
      // PERFORMANCE / STATISTICS / QOS
      // =========================
      { id: "stats-show", name: "statistics show", description: "Show available statistics objects and counters", example: "statistics show", category: "perf", tag: "Performance" },
      { id: "stats-start", name: "statistics start", description: "Start statistics sample", example: "statistics start -object volume -instance vol1", category: "perf", tag: "Performance" },
      { id: "stats-stop", name: "statistics stop", description: "Stop statistics sample", example: "statistics stop", category: "perf", tag: "Performance" },
      { id: "stats-catalog-counter-show", name: "statistics catalog counter show", description: "Show statistics counters", example: "statistics catalog counter show -object volume", category: "perf", tag: "Performance" },
      { id: "qos-policy-group-show", name: "qos policy-group show", description: "Show QoS policy groups", example: "qos policy-group show", category: "perf", tag: "Performance" },
      { id: "qos-policy-group-create", name: "qos policy-group create", description: "Create QoS policy group", example: "qos policy-group create -policy-group pg1 -vserver svm0 -max-throughput 1000iops", category: "perf", tag: "Performance" },
      { id: "qos-policy-group-delete", name: "qos policy-group delete", description: "Delete QoS policy group", example: "qos policy-group delete -policy-group pg1", category: "perf", tag: "Performance" },
      { id: "qos-workload-show", name: "qos workload show", description: "Show QoS workloads", example: "qos workload show", category: "perf", tag: "Performance" },
      { id: "qos-stat-vol-latency-show", name: "qos statistics volume latency show", description: "Show volume latency stats", example: "qos statistics volume latency show", category: "perf", tag: "Performance" },
  
      // =========================
      // DATE / TIME / NTP
      // =========================
      { id: "cluster-date-show", name: "cluster date show", description: "Show cluster date and time", example: "cluster date show", category: "time", tag: "Time/NTP" },
      { id: "cluster-date-modify", name: "cluster date modify", description: "Modify cluster date and time", example: "cluster date modify -dateandtime 2026-04-05T10:00:00", category: "time", tag: "Time/NTP" },
      { id: "cluster-time-service-ntp-server-show", name: "cluster time-service ntp server show", description: "Show NTP servers", example: "cluster time-service ntp server show", category: "time", tag: "Time/NTP" },
      { id: "cluster-time-service-ntp-server-create", name: "cluster time-service ntp server create", description: "Add NTP server", example: "cluster time-service ntp server create -server 0.pool.ntp.org", category: "time", tag: "Time/NTP" },
      { id: "cluster-time-service-ntp-server-delete", name: "cluster time-service ntp server delete", description: "Delete NTP server", example: "cluster time-service ntp server delete -server 0.pool.ntp.org", category: "time", tag: "Time/NTP" },
  
      // =========================
      // JOBS / BACKGROUND OPS
      // =========================
      { id: "job-schedule-cron-show", name: "job schedule cron show", description: "Show cron schedules", example: "job schedule cron show", category: "job", tag: "Jobs" },
      { id: "job-schedule-cron-create", name: "job schedule cron create", description: "Create cron schedule", example: "job schedule cron create -name daily_1am -dayofweek all -hour 1 -minute 0", category: "job", tag: "Jobs" },
      { id: "job-schedule-cron-delete", name: "job schedule cron delete", description: "Delete cron schedule", example: "job schedule cron delete -name daily_1am", category: "job", tag: "Jobs" },
      { id: "job-schedule-show", name: "job schedule show", description: "Show job schedules", example: "job schedule show", category: "job", tag: "Jobs" },
  
      // =========================
      // MISC / FILE ACCESS / NAME SERVICES
      // =========================
      { id: "name-service-ldap-show", name: "vserver services name-service ldap show", description: "Show LDAP config", example: "vserver services name-service ldap show -vserver svm0", category: "misc", tag: "Name Services" },
      { id: "name-service-ldap-create", name: "vserver services name-service ldap create", description: "Create LDAP client config", example: "vserver services name-service ldap create -vserver svm0 -client-config ldap1 -servers 10.0.0.20", category: "misc", tag: "Name Services" },
      { id: "name-service-ldap-delete", name: "vserver services name-service ldap delete", description: "Delete LDAP client config", example: "vserver services name-service ldap delete -vserver svm0 -client-config ldap1", category: "misc", tag: "Name Services" },
      { id: "name-service-nis-show", name: "vserver services name-service nis-domain show", description: "Show NIS domain config", example: "vserver services name-service nis-domain show -vserver svm0", category: "misc", tag: "Name Services" },
      { id: "name-service-nis-create", name: "vserver services name-service nis-domain create", description: "Create NIS domain config", example: "vserver services name-service nis-domain create -vserver svm0 -domain nis.example.com -servers 10.0.0.21", category: "misc", tag: "Name Services" },
  
      // =========================
      // CLUSTER IMAGE / UPGRADE
      // =========================
      { id: "cluster-image-show", name: "cluster image show", description: "Show cluster images", example: "cluster image show", category: "upgrade", tag: "Upgrade" },
      { id: "cluster-image-package-get", name: "cluster image package get", description: "Download ONTAP image package", example: "cluster image package get -url http://server/ontap.tgz", category: "upgrade", tag: "Upgrade" },
      { id: "cluster-image-update", name: "cluster image update", description: "Start cluster image update", example: "cluster image update -version 9.x", category: "upgrade", tag: "Upgrade" },
      { id: "cluster-image-update-progress-show", name: "cluster image update-progress show", description: "Show image update progress", example: "cluster image update-progress show", category: "upgrade", tag: "Upgrade" },
  
      // =========================
      // AUTOSUPPORT / SUPPORTABILITY
      // =========================
      { id: "autosupport-history-show", name: "system node autosupport history show", description: "Show AutoSupport history", example: "system node autosupport history show", category: "support", tag: "Supportability" },
      { id: "autosupport-invoke", name: "system node autosupport invoke", description: "Manually trigger AutoSupport", example: "system node autosupport invoke -node * -type all -message test", category: "support", tag: "Supportability" },
      { id: "autosupport-check-show", name: "system node autosupport check show", description: "Show AutoSupport check status", example: "system node autosupport check show", category: "support", tag: "Supportability" }
    ]
  };