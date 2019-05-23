Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64"
    config.vm.hostname = "deno-play.box"
    config.vm.network :private_network, ip: "192.168.0.42"

    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "deployment/provision.yml"
    end

    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "deployment/deploy.yml"
    end
end
