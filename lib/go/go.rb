$gofile = '/Users/dbe/Desktop/game.sgf'

class UnknownCommandError < StandardError
end

class GnuGo
  
  def initialize()
    #@io = IO.popen("gnugo --mode gtp -l /Users/dbe/Desktop/game.sgf", "r+")
    @io = IO.popen("gnugo --mode gtp", "r+")
  end

  #TODO: make private
  def send_message(message)
    @io.puts(message)

    resp = @io.gets()
    @io.gets() #Throw away second newline

    if resp[0] == '?'
      if resp == "? unknown command\n"
        raise UnknownCommandError
      end
    else
      resp = parse_sucessful_response(resp)
    end

    return resp
  end

  def parse_sucessful_response(response)
    return response[1..-1].strip()
  end

  def get_komi()
    return send_message('get_komi')
  end

  def set_komi(komi)
    send_message("komi #{komi}")
  end
end

