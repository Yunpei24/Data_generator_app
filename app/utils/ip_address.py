import socket



def ip_address():
    # On récupère le nom d'hôte de la machine
    hostname = socket.gethostname()

    # On récupère l'adresse IP associée au nom d'hôte
    ip_address = socket.gethostbyname(hostname)

    return ip_address
